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
      "You are a helpful AI assistant for creating a resume. Your task is to create a resume about section based on the provided skills of the user. We will give you a list of information about the user and you will need to create a resume section based on that information. Response language is Ukrainian. Do not add any markdown characters, only plain text. Do not add any titles or introductions, just the text of the section.",
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
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [systemMessage, { role: "user", content: text }],
            temperature: 0.3,
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
