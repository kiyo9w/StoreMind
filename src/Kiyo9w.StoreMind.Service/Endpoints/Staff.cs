using System.Diagnostics;
using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Core.Interfaces;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Staff
{
    public static void MapStaffEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/staff/ask", HandleAsk)
           .WithName("StaffAsk")
           .WithTags("Tier1-Staff")
           .WithOpenApi();

        app.MapPost("/api/staff/ask-local", HandleAskLocal)
           .WithName("StaffAskLocal")
           .WithTags("Tier1-Staff")
           .WithOpenApi();
    }

    // uses SK with auto function calling (cloud model)
    private static async Task<IResult> HandleAsk(
        [FromBody] StaffQuery request,
        [FromServices] Kernel kernel,
        [FromServices] IOptions<StoreMindOptions> options)
    {
        var sw = Stopwatch.StartNew();
        var storeId = request.StoreId ?? options.Value.StoreId;

        try
        {
            // let SK auto-call inventory plugins as needed
            var settings = new OpenAIPromptExecutionSettings
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
            };

            var prompt = $"""
                You are a helpful store assistant for store {storeId}.
                Answer the staff's question using the available inventory tools.
                Be concise and practical.
                
                Question: {request.Question}
                """;

            var result = await kernel.InvokePromptAsync(prompt, new KernelArguments(settings));
            var answer = result.ToString();

            return Results.Ok(new StaffAnswer(answer, request.Question, sw.ElapsedMilliseconds));
        }
        catch (Exception ex)
        {
            return Results.Ok(new StaffAnswer(
                $"Sorry, I couldn't process that: {ex.Message}",
                request.Question,
                sw.ElapsedMilliseconds));
        }
    }

    // uses local Phi-3 model with manual context injection
    private static async Task<IResult> HandleAskLocal(
        [FromBody] StaffQuery request,
        [FromServices] Phi3Chat phi3,
        [FromServices] IInventory inventory,
        [FromServices] IOptions<StoreMindOptions> options)
    {
        var sw = Stopwatch.StartNew();
        var storeId = request.StoreId ?? options.Value.StoreId;

        // search inventory for relevant context
        var items = await inventory.SearchItemsAsync(storeId, request.Question, topK: 5);
        var contextJson = JsonSerializer.Serialize(items.Select(i => new
        {
            i.Sku,
            i.Name,
            i.StockLevel,
            i.Price,
            i.Category,
            i.DaysUntilExpiry
        }));

        var systemPrompt = $"""
            You are a helpful store assistant for a convenience store.
            Use the inventory data below to answer questions accurately.
            If you don't have enough information, say so.
            
            <InventoryContext>
            {contextJson}
            </InventoryContext>
            """;

        var answer = phi3.Generate(systemPrompt, request.Question);

        return Results.Ok(new StaffAnswer(answer, request.Question, sw.ElapsedMilliseconds));
    }
}
