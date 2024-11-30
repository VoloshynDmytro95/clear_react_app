import { useState } from "react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");

  const systemMessage: Message = {
    role: "system",
    content:
      "You are a helpful AI assistant for defining job skills from the vacancy description. Your task is to analyze the job vacancy and define the professional soft and hard skills that match the vacancy. We will give you a list of skills and you will need to choose the most relevant ones. Reply maximum containts 10 skills. Does not makeup your own skills, only the ones we defined, validate response. Your response is in JSON format where there is an array of skills. Your response should have this structure: {'skills': ['skill1', 'skill2', 'skill3']}",
  };

  const callAI = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [systemMessage, { role: "assistant", content: text }],
            temperature: 0.2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data: ChatResponse = await response.json();
      const content = data.choices[0]?.message?.content || "";
      setResponse(content);
      return content;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    callAI,
    isLoading,
    error,
    response,
  };
};
