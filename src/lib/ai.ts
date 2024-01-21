// import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { JsonOutputFunctionsParser, StructuredOutputParser } from "langchain/output_parsers";
// import { RunnableSequence } from "@langchain/core/runnables";

// const chatModel = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const parser = StructuredOutputParser.fromNamesAndDescriptions({
//   prerequisites: "prerequisite courses needed to succed, should be a list",
//   skills: "necessary skills and concepts to succeed, should be a list",
// })
/*
const parser = new JsonOutputFunctionsParser();
// Define the function schema
const extractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input.",
  parameters: {
    type: "object",
    properties: {
      prerequisites: {
        type: "array",
        description: "A list of prerequisite courses",
      },
      skills: {
        type: "array",
        description: "A list of skills needed to succeed",
      },
      concepts: {
        type: "array",
        description: "A list of concepts needed to succeed",
      }
    },
    required: ["prerequisites", "skills", "concepts"],
  },
};

// Professor name, class name, description, and reviews ...
// User skill level, confidence, etc.
// User's goal (e.g. get an A, learn a lot, etc.)

const prompt1 = ChatPromptTemplate.fromTemplate(
  `{name} is a professor at UCSC that teaches {class}, which is {description}. 
  Generate a list of prerequisite knowledge and any things students need to know about
  the professor given the following reviews: {reviews}. Output should be of the format\n{format_instructions}\n{name}\n{class}\n{description}\n{reviews}\n`,
);

const runnable = prompt1
  .pipe(chatModel)
  .bind({
    functions: [extractionFunctionSchema],
    function_call: { name: "extractor" },
  })
  .pipe(parser);

async function main() {
  const reviews = [
    "Amazing professor",
    "Very helpful",
    "Hard class, be ready to read",
    "Tests are hard but she prepares well so be sure to attend lectures",
  ];
  const response = await runnable.invoke({
    name: "E Dijkstra",
    class: "CSE 130",
    description:
    "Covers the principles governing computer-systems design and complexity; familiarity with memory, storage, and networking; concurrency and synchronization; layering (abstraction and modularity); naming; client-server and virtualized system models; and performance. Requires significant programming projects demonstrating mastery of these concepts. ",
    reviews: reviews.join("Review: "),
    format_instructions: parser.getFormatInstructions()
  });

  console.log(`Response: ${JSON.stringify(response, null, 2)}`);

}

main().then(() => process.exit(0));

*/
