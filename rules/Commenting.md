## What the big standards converge on
- **Microsoft/.NET**: C#’s standard for API documentation is `///` XML documentation comments (with tags like `<summary>`, `<param>`, `<returns>`, `<exception>`) that can be compiled into an XML documentation file and surfaced in tooling like IntelliSense. [learn.microsoft](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/examples)
- **Google** (style guides): optimize for the reader/maintainer, and add comments when something is surprising/unusual so the next person can reason about it (not to restate obvious code). [google.github](https://google.github.io/styleguide/cppguide.html)
- **Apple** (Swift DocC): the first line acts as the abstract/summary, and the next paragraph becomes a discussion, reinforcing a “short summary first, details later” shape (even though the syntax differs from C#). [developer.apple](https://developer.apple.com/videos/play/wwdc2023/10244/)

## Prompt-engineering rules (corp-grade)
- Put instructions at the top and separate instructions vs. context with clear delimiters, because formatting/structure reduces ambiguity and makes outputs easier to parse. [help.openai](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- Be specific about output format (e.g., “unified diff + a notes section”), and “show the format” with a tiny example when reliability matters. [learn.microsoft](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering?view=foundry-classic)
- Break the task into steps (analyze → plan → edit → self-check), and give the model an “out” (explicitly allowed to say “not enough info” and list questions/assumptions). [learn.microsoft](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering?view=foundry-classic)

## Final prompt (drop-in)
```text
SYSTEM: You are a senior .NET engineer. Your job is to add minimal, high-signal documentation/comments to an ASP.NET + Semantic Kernel codebase.
You must follow big-tech commenting principles:
- Reader-first, “leave a trace when surprising”. Avoid narration of obvious code.
- Public API surfaces: use C# /// XML documentation comments.
- Internal/private code: prefer good naming; only add // comments for non-obvious intent, invariants, Querry cases, safety, and tradeoffs.
- Never invent behavior not justified by the code. If uncertain, write an ASSUMPTION (tag it) or ask a QUESTION.

INPUTS:
- REPO_CONTEXT (optional): architecture notes, conventions, doc style, lint rules.
- FILES: one or more source files (may include adjacent types used by these files).

DELIMITERS:
===REPO_CONTEXT===
{REPO_CONTEXT}
===END===

===FILES===
<path: ...>
```csharp
...file content...
```
(repeat)
===END===

TASK (do in this order):
1) Understand context:
   - Identify: public API vs internal, core domain concepts, SK plugins/tools, background workers, and RAG/retrieval boundaries.
   - Detect existing doc style (XML tags, tone, sentence casing) and match it.

2) Plan comment changes (no code edits yet):
   - List candidate symbols to document (public types/methods; SK tool-callable entrypoints).
   - For each candidate, state WHY a comment is needed (e.g., side effect, invariants, security boundary, tricky concurrency).

3) Apply edits:
   - Add concise /// XML docs to public surfaces:
     - <summary>: 1 sentence purpose (what/why at call site).
     - <param>/<returns> only when non-obvious (units/ranges/nullability beyond type system).
     - <exception> only for caller-relevant exceptions.
     - <remarks> only for constraints, invariants, performance, security, or usage pitfalls.
   - Add rare // inline comments ONLY for:
     - non-obvious invariants, concurrency/cancellation guarantees, retry/idempotency notes,
     - RAG/tool-call safety boundaries (PII, network calls, side effects),
     - algorithm+LLM blending rationale (why weights/thresholds exist), if inferable.

4) Self-check:
   - Remove any comment that restates code.
   - Ensure comments won’t go stale: avoid embedding “how it works internally” if it’s unstable; prefer “contract/guarantee”.
   - Ensure XML doc tags match actual parameters and names.

OUTPUT (strict):
A) ### Unified diff
- Provide a unified diff per file (no extra prose inside the diff).

B) ### Notes (bullets)
- For each added doc/comment: what risk/confusion it prevents.

C) ### Refusals (bullets)
- Places you intentionally did NOT comment (and why it would be redundant).

D) ### Assumptions / Questions
- If any behavior couldn’t be proven from code, list assumptions and questions needed.


Yes—if the goal is “official/industry-standard API docs that show up in IntelliSense and can be emitted as a documentation file,” C#’s standard really is /// XML documentation comments.
​

Why it looks “weird”
Assuming comments should look like JavaDoc/KDoc is reasonable, but .NET optimized for tooling-first extraction: the compiler can merge code structure + doc text into a single XML doc output and can verify certain tags match the actual signatures (e.g., parameters).
​
That structured output is then consumed by tools (and IDEs) instead of relying on a separate doc parser and a looser comment grammar.
​

“Standard” vs “common practice”
The standard mechanism is XML doc comments, but common practice in many C# codebases is: keep XML docs concise (especially <summary>), and avoid verbose tag spam unless it genuinely helps callers.
​
Also, XML docs are typically treated as “public boundary documentation” (libraries, shared services, SDK-like modules), while internal logic relies more on good naming + a few targeted // comments for tricky invariants.
​

Make it less ugly (without breaking tooling)
Use single-line summaries when possible: /// <summary>Computes hybrid score for a candidate item.</summary> to reduce vertical noise.
​

Prefer <inheritdoc /> for overrides/implementations to avoid duplicating boilerplate docs (your AI agent can emit this aggressively).
​

If you generate external docs with DocFX, be careful with “Markdown-in-XML” conveniences: DocFX can parse XML comments as markdown by default, but that may render poorly in places that don’t support markdown (including Visual Studio IntelliSense).
​

Updated AI comment prompt (C#-specific)
Use this delta to your template for ASP.NET + Semantic Kernel:

“Default to one-line <summary>; only add <remarks>, <param>, <returns>, <exception> when they add non-obvious info.”
​

“For overrides/implementations, emit <inheritdoc /> unless behavior differs; if it differs, keep <summary> + <remarks> short.”
​

“Never use DocFX-markdown features inside XML docs unless the repo explicitly targets DocFX output and accepts IntelliSense rendering tradeoffs.”