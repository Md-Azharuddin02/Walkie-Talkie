
async function getDeepSeekResponseStream(prompt, onData) {
  const response = await fetch(import.meta.env.API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env._API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "MyReactApp"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
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

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter(line => line.trim() !== '');

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const json = line.replace("data: ", "");
        if (json === "[DONE]") break;
        try {
          const parsed = JSON.parse(json);
          const token = parsed.choices?.[0]?.delta?.content || "";
          fullMessage += token;
          onData(token); // update UI piece by piece
        } catch (err) {
          console.error("Error parsing stream chunk", err);
        }
      }
    }
  }

  return fullMessage;
}
export default getDeepSeekResponseStream;