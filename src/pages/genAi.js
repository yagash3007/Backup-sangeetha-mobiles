import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyB8sj23ffW1rf5UlhVJU2Nms18GC4VVpYQ";  
const genAI = new GoogleGenerativeAI(apiKey);

export const GenAiMenu = async (transcript) => {
  try {
    const prompt = `
      Analyze the following sales transcript and generate two SQL queries in the exact format below based on the product mentioned in the transcript:

      - If the sales person talks about **headphones** or mentions related terms like **buds**, **headset**, etc., dont make exact match like operator generate queries using the \`headphone_data\` table.

      - If the sales person talks about **mobiles** or mentions related terms like **smartphone**, **mobile**, **cell phone**, etc., generate queries using the \`mobile_data\` table if you generated query using product_name use like operator .
      - If the sales person talks about **laptops** or mentions related terms like **laptop**, **notebook**, etc., generate queries using the \`laptop_data\` table if you generated query using product_name use like operator .
      - If the sales person talks about **smartwatches** or mentions related terms like **watch**, **fitness band**, **smart watch**, etc., generate queries using the \`smartwatch_data\` table if you generated query using product_name use like operator.

      Please generate only one set of queries based on the product type mentioned in the transcript. The queries should be in the following format:

      datatypes:
      price : int
      ram : int
      screen_size : double
      storage : int
      battery : int

      1. **Exact Match Query**:
         - For **headphones**, retrieve fields: \`brand\`, \`product_img\`, \`product_name\`, \`price\`, \`description\`,\`battery\`,\`connectivity\` from the \`headphone_data\` table.
         - For **mobile**, retrieve fields: \`brand\`, \`product_img\`, \`product_name\`, \`ram\`, \`screen_size\`, \`storage\`, \`battery\`, \`price\`, \`description\` ,\`camera\`,\`operating_system\`,\`processor\`,from the \`mobile_data\` table.
         - For **laptops**, retrieve fields: \`brand\`, \`product_img\`, \`product_name\`, \`ram\`,  \`price\`, \`description\` from the \`laptop_data\`,\`storage\`, \`battery\` \`operating_system\`,\`processor\`,\`screen_size\`laptop_data\` table.
         - For **smartwatches**, retrieve fields: \`brand\`, \`product_img\`, \`product_name\`, \`price\`, \`description\`, \`battery\`,\`connectivity\` from the \`smartwatch_data\` table.

      2. **Recommendation Query**:
         - Provide a recommendation for **headphones**, **mobiles**, **laptops**, or **smartwatches** based on matching **brand**, **battery**, **screen size**, **ram**, **price** specifications.

      Please ensure that the queries are generated with **SQL syntax** and **use proper query formatting**. Include the \`EXACT_MATCH_QUERY:\` and \`RECOMMENDED_PRODUCTS_QUERY:\` markers at the beginning of each query result.

      for recommendation query use any price range,ram range brand which matches the products generate query give random values

      Example format of response:
      \`\`\`
      EXACT_MATCH_QUERY: <Your SQL query for exact match>
      RECOMMENDED_PRODUCTS_QUERY: <Your SQL query for recommendations>
      \`\`\`

      Transcript: "${transcript}"
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();

    console.log("Raw API Response:", response);

    const queries = {
      exactQuery: "",
      recommendationQuery: "",
    };

    const exactMatchMarker = "EXACT_MATCH_QUERY:";
    const recommendedMarker = "RECOMMENDED_PRODUCTS_QUERY:";

    if (response.includes(exactMatchMarker) && response.includes(recommendedMarker)) {
      const exactStartIndex = response.indexOf(exactMatchMarker) + exactMatchMarker.length;
      const exactEndIndex = response.indexOf(recommendedMarker);
      queries.exactQuery = response.slice(exactStartIndex, exactEndIndex).trim().replace(/```sql/g, '').replace(/```/g, '').trim();

      const recStartIndex = response.indexOf(recommendedMarker) + recommendedMarker.length;
      queries.recommendationQuery = response.slice(recStartIndex).trim().replace(/```sql/g, '').replace(/```/g, '').trim();

      console.log("Exact Match Query:", queries.exactQuery);
      console.log("Recommendation Query:", queries.recommendationQuery);

      return queries;
    } else {
      console.error("Response does not contain expected markers:", response);
      return { exactQuery: "", recommendationQuery: "" };
    }
  } catch (error) {
    console.error("Error in GenAiMenu:", error);
    return { exactQuery: "", recommendationQuery: "" };
  }
};
