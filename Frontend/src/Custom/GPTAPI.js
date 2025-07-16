const VITE_API_KEY = "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";
const VITE_API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function getDeepSeekResponseStream(prompt, onData) {
  const response = await fetch(VITE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VITE_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "MyReactApp"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      // This is for the another version, for the commented token in the
      // model: "deepseek/deepseek-chat-v3-0324:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullMessage = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; // Keep incomplete line in buffer

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && trimmedLine.startsWith("data: ")) {
        const json = trimmedLine.replace("data: ", "");
        if (json === "[DONE]") break;
        try {
          const parsed = JSON.parse(json);
          const token = parsed.choices?.[0]?.delta?.content || "";
          if (token) {
            fullMessage += token;
            onData(token); // update UI piece by piece
          }
        } catch (err) {
          console.error("Error parsing stream chunk", err);
        }
      }
    }
  }

  return fullMessage;
}

export default getDeepSeekResponseStream;