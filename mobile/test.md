
Performing hot restart...                                               
Restarted application in 6,320ms.
flutter: LocalStorageSecureService: init complete, keys: (password, username, darkMode)
flutter: NoOpNotificationService: init called (iOS bypass)
flutter: LocalStorageSecureService: getString called for key=darkMode
flutter: LocalStorageSecureService: getString result for key=darkMode: true
flutter: LocalStorageSecureService: getString called for key=isFirstUse
flutter: LocalStorageSecureService: getString result for key=isFirstUse: null
flutter: LocalStorageSecureService: getString called for key=locale
flutter: LocalStorageSecureService: getString result for key=locale: null
flutter: DioModule: CookieManager added
flutter: AuthCubit: checkAuthStatus started
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: AuthCubit: Token is null or empty
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: ╔ Headers
flutter: ╟ Accept: application/json
flutter: ╟ Content-Type: application/json
flutter: ╟ cookie: null
flutter: ╟ contentType: application/json
flutter: ╟ responseType: ResponseType.json
flutter: ╟ followRedirects: true
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Extras
flutter: ╟ withCredentials: true
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter:
flutter: ╔╣ Response ║ GET ║ Status: 200 OK  ║ Time: 864 ms
flutter: ║  https://api-dev.trinq.site/api/v1/rag/resources
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Headers
flutter: ╟ connection: [keep-alive]
flutter: ╟ alt-svc: [h3=":443"; ma=86400]
flutter: ╟ date: [Tue, 16 Dec 2025 20:51:40 GMT]
flutter: ╟ transfer-encoding: [chunked]
flutter: ╟ content-encoding: [gzip]
flutter: ╟ nel: [{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}]
flutter: ╟ cf-ray: [9af10f619eaafd2d-SIN]
flutter: ╟ report-to:
flutter: ║ [{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/repo
flutter: ║ rt/v4?s=HkjcoEZKpNxR6LVfosnifrazX5PPihbbexlp7KFxBAYgnoghSnpzSGI8n9Z%2FOKT8oa9YPDgfBeHbfwiI
flutter: ║ BOANos%2BO2ngLp%2BJb%2FhGL2EJuQh0r1w%3D%3D"}]}]
flutter: ╟ cf-cache-status: [DYNAMIC]
flutter: ╟ content-type: [application/json]
flutter: ╟ server: [cloudflare]
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Body
flutter: ║
flutter: ║    {
flutter: ║         "resources": [
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/68d775c2cf2011f0b68bee4add2f28e0",
flutter: ║                 "title": "Tài liệu kỹ thuật nhà máy nước",
flutter: ║                 "description": "  Knowledge base này bao gồm các tài liệu kỹ thuật vận hành nội bộ của nh
flutter: ║                  à máy nước"
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/919d1bf8ca8c11f0ab82c6efc818388e",
flutter: ║                 "title": "Kinh tế tài chính",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║          {uri: rag://dataset/30cf3e82ca8c11f09e16c6efc818388e, title: Chính trị, description:   },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/de45ba0ac84811f0b07ac6efc818388e",
flutter: ║                 "title": "Khoa học công nghệ",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/cb058d08c0c311f091d536febb3bd76d",
flutter: ║                 "title": "Thư viện pháp luật",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/f152f4a2ba8b11f0b42e42712a4e326d",
flutter: ║                 "title": "synthnet-knowledge-base",
flutter: ║                 "description": "Knowledge base for SynthNet"
flutter: ║            }
flutter: ║         ]
flutter: ║    }
flutter: ║
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: [ConversationScreen] initState - chatMode: ChatMode.deepQa
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: [ConversationScreen] _sendMessage - chatMode: ChatMode.deepQa
flutter: [ConversationScreen] Using streamDeepQa
flutter: [SSE] Connecting to /api/v1/chat/completions
flutter: [SSE] Request Body: {"messages":[{"content":"openai scarlett johanson","role":"user","is_error_message":false}],"conversation_id":"b98a404b-65fb-44cd-a82c-f6adbcdb67c9","thread_id":"846199c9-21d4-4ee7-b22e-b0ca3a33feb4","intra_info_config":{"enabled":true,"max_results":5,"resources":[{"uri":"rag://dataset/68d775c2cf2011f0b68bee4add2f28e0","title":"Tài liệu kỹ thuật nhà máy nước","description":"  Knowledge base này bao gồm các tài liệu kỹ thuật vận hành nội bộ của nhà máy nước"},{"uri":"rag://dataset/919d1bf8ca8c11f0ab82c6efc818388e","title":"Kinh tế tài chính","description":"  "},{"uri":"rag://dataset/30cf3e82ca8c11f09e16c6efc818388e","title":"Chính trị","description":"  "},{"uri":"rag://dataset/de45ba0ac84811f0b07ac6efc818388e","title":"Khoa học công nghệ","description":"  "},{"uri":"rag://dataset/cb058d08c0c311f091d536febb3bd76d","title":"Thư viện pháp luật","description":"  "},{"uri":"rag://dataset/f152f4a2ba8b11f0b42e42712a4e326d","t<…>
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: ╔ Headers
flutter: ╟ Accept: application/json
flutter: ╟ Content-Type: application/json
flutter: ╟ cookie: null
flutter: ╟ contentType: application/json
flutter: ╟ responseType: ResponseType.json
flutter: ╟ followRedirects: true
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Extras
flutter: ╟ withCredentials: true
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter:
flutter: ╔╣ Response ║ GET ║ Status: 200 OK  ║ Time: 162 ms
flutter: ║  https://api-dev.trinq.site/api/v1/rag/resources
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Headers
flutter: ╟ connection: [keep-alive]
flutter: ╟ alt-svc: [h3=":443"; ma=86400]
flutter: ╟ date: [Tue, 16 Dec 2025 20:52:35 GMT]
flutter: ╟ transfer-encoding: [chunked]
flutter: ╟ content-encoding: [gzip]
flutter: ╟ nel: [{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}]
flutter: ╟ cf-ray: [9af110ba69e0b6a3-HKG]
flutter: ╟ report-to:
flutter: ║ [{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/repo
flutter: ║ rt/v4?s=z1twFDoRfY32pm7OOVJHZVBkNCpAbmdlO%2BbCFnYk3OSYz8WO4V39HGsk8q45vsHUH%2F%2FEpPhJGUdp
flutter: ║ 6vv%2F8DWM0%2FcpcAtxlAtieTqd0v3La8aCvw%3D%3D"}]}]
flutter: ╟ cf-cache-status: [DYNAMIC]
flutter: ╟ content-type: [application/json]
flutter: ╟ server: [cloudflare]
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: ╔ Body
flutter: ║
flutter: ║    {
flutter: ║         "resources": [
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/68d775c2cf2011f0b68bee4add2f28e0",
flutter: ║                 "title": "Tài liệu kỹ thuật nhà máy nước",
flutter: ║                 "description": "  Knowledge base này bao gồm các tài liệu kỹ thuật vận hành nội bộ của nh
flutter: ║                  à máy nước"
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/919d1bf8ca8c11f0ab82c6efc818388e",
flutter: ║                 "title": "Kinh tế tài chính",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║          {uri: rag://dataset/30cf3e82ca8c11f09e16c6efc818388e, title: Chính trị, description:   },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/de45ba0ac84811f0b07ac6efc818388e",
flutter: ║                 "title": "Khoa học công nghệ",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/cb058d08c0c311f091d536febb3bd76d",
flutter: ║                 "title": "Thư viện pháp luật",
flutter: ║                 "description": "  "
flutter: ║            },
flutter: ║            {
flutter: ║                 "uri": "rag://dataset/f152f4a2ba8b11f0b42e42712a4e326d",
flutter: ║                 "title": "synthnet-knowledge-base",
flutter: ║                 "description": "Knowledge base for SynthNet"
flutter: ║            }
flutter: ║         ]
flutter: ║    }
flutter: ║
flutter: ╚══════════════════════════════════════════════════════════════════════════════════════════╝
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "It"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " seems"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " like"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " you"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "'re"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " interested"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " in"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " something"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " related"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " to"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " Open"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " and"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " Scarlett"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " Joh"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "ansson"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "."}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " Could"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " you"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " please"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " clarify"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " your"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " request"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "?"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " For"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " example"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " are"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " you"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " asking"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " about"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " a"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " collaboration"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " a"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " voice"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " model"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " something"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": " else"}}
flutter:
flutter: [SSE] Received Event:  {"event": "text-chunk", "data": {"event_type": "text-chunk", "text": "?"}}
flutter:
flutter: [SSE] Received Event:  {"event": "related-queries", "data": {"event_type": "related-queries", "related_queries": ["Has OpenAI developed a voice model inspired by Scarlett Johansson's voice?", "Is there any official collaboration between OpenAI and Scarlett Johansson on AI projects?", "What are the ethical considerations of using celebrity voices in AI-generated content?"]}}
flutter:
flutter: [SSE] Received Event:  {"event": "stream-end", "data": {"event_type": "stream-end", "thread_id": "846199c9-21d4-4ee7-b22e-b0ca3a33feb4"}}
flutter:
flutter: [SSE] Connection closed
flutter: [SSE] Controller cancelled
flutter: [ConversationScreen] _sendMessage - chatMode: ChatMode.deepQa
flutter: [ConversationScreen] Using streamDeepQa
flutter: [SSE] Connecting to /api/v1/chat/completions
flutter: [SSE] Request Body: {"messages":[{"content":"openai scarlett johanson","role":"user","is_error_message":false},{"content":"It seems like you're interested in something related to OpenAI and Scarlett Johansson. Could you please clarify your request? For example, are you asking about a collaboration, a voice model, or something else?","role":"assistant","related_queries":["Has OpenAI developed a voice model inspired by Scarlett Johansson's voice?","Is there any official collaboration between OpenAI and Scarlett Johansson on AI projects?","What are the ethical considerations of using celebrity voices in AI-generated content?"],"is_error_message":false},{"content":"Is there any official collaboration between OpenAI and Scarlett Johansson on AI projects?","role":"user","is_error_message":false}],"conversation_id":"b98a404b-65fb-44cd-a82c-f6adbcdb67c9","thread_id":"846199c9-21d4-4ee7-b22e-b0ca3a33feb4","intra_info_config":{"enabled":true,"max_results":5,"resources":[{"uri":"rag://dataset/68d775c2c<…>
flutter: LocalStorageSecureService: getString called for key=accessToken
flutter: LocalStorageSecureService: getString result for key=accessToken: null
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-call-tool", "data": {"event_type": "agent-call-tool"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-query-plan", "data": {"event_type": "agent-query-plan", "steps": ["Verify official statements or press releases from OpenAI and Scarlett Johansson regarding any collaboration on AI projects", "Investigate reports and credible sources about Scarlett Johansson's claims regarding AI voice cloning and her legal actions against companies using her voice", "Examine media coverage and industry analysis on the controversy surrounding the use of Scarlett Johansson's voice in AI models, including OpenAI's involvement or response"]}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-search-queries", "data": {"event_type": "agent-search-queries", "step_number": 0, "queries": ["OpenAI Scarlett Johansson official collaboration", "Scarlett Johansson AI voice clone allegations", "OpenAI response to Johansson voice rights claims"]}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-read-results", "data": {"event_type": "agent-read-results", "step_number": 0, "results": [{"index": 1, "title": "Văn hóa lập trình xanh_ DNA mới cho nhân lực AI Việt Nam - Ấn phẩm Tia Sáng.pdf", "content": "\n\nMột số nghiên cứu chỉ ra rằng, việc huấn luyện các mô hình ngôn ngữ lớn (LLM) chỉ trong đời hỏi năng lượng khổng lồ và tạo ra lượng phát thải CO<sub>2</sub> đáng kể. Chẳng hạn, mô hình Chat GPT-3, huấn luyện trong vòng khoảng một tháng, đòi hỏi điện năng gấp khoảng 100 lần lượng điện tiêu thụ trung bình của một hộ gia đình ở Mỹ và thải ra lượng khí thải nhà kính gấp gần 10 lần so với một ô tô trong suốt vòng đời của nó. Trong khi đó, các thuật toán hoặc cách triển khai thiếu tối ưu có thể khiến chi phí năng lượng giảm đi nhiều lần, dù kết quả đầu ra khô<…>
flutter:
flutter: [SSE Transform] agent-read-results: images=0
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "**"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "Summary"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " –"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Current"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Step"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ":"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Verification"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " of"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " official"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " statements"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " press"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " releases"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "**\n\n"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "None"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " of"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " the"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " seven"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " search"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " results"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " retrieved"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " for"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " this"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " step"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " contain"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " any"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " official"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " statements"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " press"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " releases"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " public"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " announcements"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " indicating"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " a"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " collaboration"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " between"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Open"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " and"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Scarlett"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " "}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "Joh"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "ansson"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " on"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " projects"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "."}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Each"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " result"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " addresses"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " unrelated"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " topics"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " such"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " as"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " “"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "green"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " coding"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "”"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " in"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Vietnamese"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " smartphone"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " specifications"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " software"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " interfaces"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " legal"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " texts"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " on"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " artificial"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "‑"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "int"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "elligence"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " regulations"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": ","}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " and"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " does"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " not"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " reference"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " either"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Open"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " Scarlett"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " "}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "Joh"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "ansson"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " a"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " joint"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " initiative"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": " ["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "1"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "2"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "3"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "4"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "5"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "6"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]["}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "7"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 0, "text": "]."}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-search-queries", "data": {"event_type": "agent-search-queries", "step_number": 1, "queries": ["OpenAI Scarlett Johansson official collaboration", "Scarlett Johansson AI voice clone legal case", "OpenAI response to Johansson voice cloning claims"]}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-read-results", "data": {"event_type": "agent-read-results", "step_number": 1, "results": [{"index": 8, "title": "Văn hóa lập trình xanh_ DNA mới cho nhân lực AI Việt Nam - Ấn phẩm Tia Sáng.pdf", "content": "\n\nMột số nghiên cứu chỉ ra rằng, việc huấn luyện các mô hình ngôn ngữ lớn (LLM) chỉ trong đời hỏi năng lượng khổng lồ và tạo ra lượng phát thải CO<sub>2</sub> đáng kể. Chẳng hạn, mô hình Chat GPT-3, huấn luyện trong vòng khoảng một tháng, đòi hỏi điện năng gấp khoảng 100 lần lượng điện tiêu thụ trung bình của một hộ gia đình ở Mỹ và thải ra lượng khí thải nhà kính gấp gần 10 lần so với một ô tô trong suốt vòng đời của nó. Trong khi đó, các thuật toán hoặc cách triển khai thiếu tối ưu có thể khiến chi phí năng lượng giảm đi nhiều lần, dù kết quả đầu ra khô<…>
flutter:
flutter: [SSE Transform] agent-read-results: images=0
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": "No"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " relevant"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " information"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " was"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " found"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " in"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " the"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " provided"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " search"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " results"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " regarding"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " Scarlett"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " "}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": "Joh"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": "ansson"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": "’s"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " claims"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " about"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " AI"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " voice"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " cloning"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " or"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " any"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " legal"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " actions"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " she"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " has"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " taken"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " against"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " companies"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " using"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " her"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": " voice"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 1, "text": "."}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-search-queries", "data": {"event_type": "agent-search-queries", "step_number": 2, "queries": ["OpenAI Scarlett Johansson official collaboration", "Scarlett Johansson AI voice clone legal action", "OpenAI response to Scarlett Johansson voice controversy"]}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-read-results", "data": {"event_type": "agent-read-results", "step_number": 2, "results": [{"index": 15, "title": "Văn hóa lập trình xanh_ DNA mới cho nhân lực AI Việt Nam - Ấn phẩm Tia Sáng.pdf", "content": "\n\nMột số nghiên cứu chỉ ra rằng, việc huấn luyện các mô hình ngôn ngữ lớn (LLM) chỉ trong đời hỏi năng lượng khổng lồ và tạo ra lượng phát thải CO<sub>2</sub> đáng kể. Chẳng hạn, mô hình Chat GPT-3, huấn luyện trong vòng khoảng một tháng, đòi hỏi điện năng gấp khoảng 100 lần lượng điện tiêu thụ trung bình của một hộ gia đình ở Mỹ và thải ra lượng khí thải nhà kính gấp gần 10 lần so với một ô tô trong suốt vòng đời của nó. Trong khi đó, các thuật toán hoặc cách triển khai thiếu tối ưu có thể khiến chi phí năng lượng giảm đi nhiều lần, dù kết quả đầu ra kh<…>
flutter:
flutter: [SSE Transform] agent-read-results: images=0
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": "No"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": " relevant"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": " information"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": " was"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": " found"}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-understand-results", "data": {"event_type": "agent-understand-results", "step_number": 2, "text": "."}}
flutter:
flutter: [SSE] Received Event:  {"event": "agent-finish", "data": {"event_type": "agent-finish"}}
flutter:
flutter: [SSE] Received Event:  {"event": "begin-stream", "data": {"event_type": "begin-stream", "query": "Is there any official collaboration between OpenAI and Scarlett Johansson on AI projects?"}}
flutter:
