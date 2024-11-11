import { GoogleGenerativeAI } from "@google/generative-ai";  

const apiKey = "AIzaSyB8sj23ffW1rf5UlhVJU2Nms18GC4VVpYQ";  
const genAI = new GoogleGenerativeAI(apiKey);  

export const GenAiMenu = async (transcript) => {
  try {
    const prompt = `
      Analyze this sales transcript and generate two SQL queries in the following exact format:

      Exact Match Query:
      SELECT ... FROM mobile_data WHERE ...

      Recommended Products Query:
      SELECT ... FROM mobile_data WHERE ...

      Each query should retrieve fields like brand, product_img, product_name, ram, screen_size, storage, battery, camera, price.
      The fields ram, screen_size, camera, price, and battery in the mobile_data table are stored as integers.
      The exact match query should filter products based on strict match criteria, while the recommended products query should filter for similar products based on the same or other brands (Samsung, Realme, Oppo, Motorola, iPhone, etc.) and integer averages for brand, ram, screen_size, and battery values.

      Transcript:
      ${transcript}

      Return only the queries in the specified format, using integer comparisons where needed.
    `;
  
    const result = await genAI
      .getGenerativeModel({ model: "gemini-1.5-flash" })
      .generateContent(prompt);

    if (result.response.candidates.length > 0) {
      const queriesText = result.response.candidates[0].content.parts[0].text.trim();
      const cleanedText = queriesText
        .replace(/```sql/g, "")
        .replace(/```/g, "")
        .replace(/##/g, "")
        .trim();

      // Use regex to extract the queries from the cleaned text
      const exactMatchRegex = /Exact Match Query:\s*(SELECT.*?FROM.*?)(?=\n\s*\n|$)/s;
      const recommendedQueryRegex = /Recommended Products Query:\s*(SELECT.*?FROM.*?)(?=\n\s*\n|$)/s;

      const exactMatchMatch = exactMatchRegex.exec(cleanedText);
      const recommendedQueryMatch = recommendedQueryRegex.exec(cleanedText);

      // Make sure these variables are properly assigned
      const exactQuery = exactMatchMatch ? exactMatchMatch[1].trim() : "";
      const recommendationQuery = recommendedQueryMatch ? recommendedQueryMatch[1].trim() : "";

      // Return the queries
      return { exactQuery, recommendationQuery };
    }

    return { exactQuery: "", recommendationQuery: "" };
  } catch (error) {
    console.error("Error with GenAI API:", error);
    return { exactQuery: "", recommendationQuery: "" };
  }
};
