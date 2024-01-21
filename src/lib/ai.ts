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
*/
import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    prerequisites: z
      .array(z.string())
      .describe("prerequisite courses needed to succeed, as a list"),
    concepts: z
      .array(z.string())
      .describe("necessary concepts to succeed, should be a list"),
    professorInfo: z
      .array(z.string())
      .describe(
        "information about the professor to be aware of, should be a list",
      ),
  }),
);

const prompt1 = PromptTemplate.fromTemplate(
  `{name} is a professor at UCSC that teaches {class}, which is {description}. 
  Generate a list of prerequisite knowledge and any things students need to know about
  the professor given the following reviews: {reviews}.\n{format_instructions}\n{name}\n{class}\n{description}\n{reviews}\n`,
);

const chain = RunnableSequence.from([
  prompt1,
  new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  }),
  parser,
]);

async function main() {
  const response = await chain.invoke({
    name: "E. Dijkstra",
    class: "CSE 130",
    description:
      "Covers the principles governing computer-systems design and complexity; familiarity with memory, storage, and networking; concurrency and synchronization; layering (abstraction and modularity); naming; client-server and virtualized system models; and performance. Requires significant programming projects demonstrating mastery of these concepts. Prerequisite(s): CSE 15 and CSE 15L, or CSE 13S and CMPM 35; or CSE 13E and CMPM 35, or CSE 101.",
    reviews: [
      "Review: This class was challenging but extremely rewarding. Professor Dijkstra's lectures were clear and insightful. The projects helped solidify my understanding of the concepts.",
      "Review: I found this class to be quite difficult. The workload was heavy and the material was complex. Professor Dijkstra's teaching style was not very engaging.",
      "Review: CSE 130 with Professor Dijkstra was one of the best classes I've taken. The course content was interesting and relevant. The professor was always available to help and provided valuable feedback on assignments.",
    ].join("\n"),
    format_instructions: parser.getFormatInstructions(),
  });

  console.log(response);
}

main().then(() => process.exit(0));
/*
{ answer: 'Paris', sources: [ 'https://en.wikipedia.org/wiki/Paris' ] }
*/
