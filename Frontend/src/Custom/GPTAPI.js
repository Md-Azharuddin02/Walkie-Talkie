const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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";

async function getDeepSeekResponseStream(prompt, onData) {
  if (!API_KEY) throw new Error("API key is missing. Set VITE_API_KEY in your .env file.");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "MyReactApp"              
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok || !response.body) {
    throw new Error(`OpenRouter error: ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullMessage = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ''; // keep incomplete line

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data: ")) {
        const json = trimmed.slice(6);
        if (json === "[DONE]") break;

        try {
          const parsed = JSON.parse(json);
          const token = parsed.choices?.[0]?.delta?.content || "";
          if (token) {
            fullMessage += token;
            onData(token);
          }
        } catch (err) {
          console.error("Failed to parse stream chunk:", err);
        }
      }
    }
  }

  return fullMessage;
}

export default getDeepSeekResponseStream;
