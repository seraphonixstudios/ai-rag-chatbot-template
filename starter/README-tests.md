AI Template - Test Errors

- Purpose: Validate error payloads and toast UX for the AI test UI.
- Endpoints:
  - /debug/error?code=...&message=...&status=...
- How to run:
  1. Build and run the AI starter: cd ai-rag-chatbot-template/starter; docker-compose up --build
  2. Open http://localhost:8000/public/index.html for chat UI
  3. Open http://localhost:8000/public/test-errors.html to exercise error payloads
  4. Use curl to hit the endpoint directly: curl -s "http://localhost:8000/debug/error?code=TEST&message=boom&status=400"
- UI tests:
  - Run: npm run test-ui from ai-rag-chatbot-template/starter/tests/ui (install first)
  - This runs multi-browser tests (Chromium, Firefox, WebKit)
  - Tests run across Chromium/Firefox/WebKit; test file targets test_errors.spec.js within ai/test_errors.spec.js
- What to verify:
  - UI tests assert a toast appears after triggering an error
  - The payload is present in the log (trace_id present in AI endpoint payload)
- AI test page:
  - The AI test page at /public/test-errors.html can be used for manual testing; UI tests cover the toast and payload UX as well.
