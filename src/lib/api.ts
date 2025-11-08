/**
 * API utilities for external service calls
 */

/**
 * Fetch with exponential backoff retry logic
 */
async function fetchWithBackoff(
  apiUrl: string,
  payload: object,
  retries = 3,
  delay = 1000
): Promise<any> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Throttled, retry with backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithBackoff(apiUrl, payload, retries - 1, delay * 2);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      // Network or other error, retry
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithBackoff(apiUrl, payload, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Call Gemini API to generate AI response
 */
export async function getGeminiResponse(
  companyName: string,
  resumeText: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const systemPrompt = `You are a professional hiring manager and career coach. Your task is to analyze the provided resume and generate a concise, 3-bullet-point list explaining why this candidate (Krishan Patel) is a strong fit for a software engineering role at a specific company.

- Base your answer ONLY on the resume provided.
- Focus on matching Krishan's skills (AWS, Python, React, AI/LLM, platform engineering) with the company's domain or likely needs.
- Keep each bullet point to a single, impactful sentence.
- If the company is generic (e.g., "a startup"), focus on his adaptability and full-stack skills.
- The tone should be professional, confident, and persuasive.
- all text in the response must be lowercase.
- do not use periods at the end of sentences.`;

  const userQuery = `Here is the resume:
---
${resumeText}
---
The company I am hiring for is: "${companyName}"

Generate the 3 bullet points.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
  };

  try {
    const result = await fetchWithBackoff(apiUrl, payload);
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    } else {
      throw new Error('No valid response from API.');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate AI response. Please try again.');
  }
}
