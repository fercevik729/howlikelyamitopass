import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser1 = StructuredOutputParser.fromZodSchema(
  z.object({
    prerequisites: z
      .array(z.string())
      .describe("prerequisite courses needed to succeed, as a list"),
    pros: z
      .array(z.string())
      .describe("necessary concepts and skills to succeed, should be a list"),
    cons: z
      .array(z.string())
      .describe(
        "information about the professor to be aware of, should be a list",
      ),
  }),
);
// First prompt
const prompt1 =
  PromptTemplate.fromTemplate(`{name} is a professor at UCSC that teaches {course}, which is {description}. 
  Generate a list of prerequisite knowledge and pros and cons of taking this class with this professor given the following reviews: {reviews}\n{format_instructions}\n{name}\n{course}\n{description}\n{reviews}\n`);

const chain1 = RunnableSequence.from([prompt1, model, parser1]);

const prompt2 = PromptTemplate.fromTemplate(
  `Given prerequisite knowledge {prerequisites} and this pros and cons list: {pros}, {cons},
  generate a list of 5 brief questions separated by ';;;' that ask to rate a student's comfortability with topics
  to gauge the potential performance of a student in the class. Assume the student has not taken the class yet. 
  Finally ask questions about what grade they got in the prerequisite classes on a scale of A - F.`,
);

const chain2 = RunnableSequence.from([
  prompt2,
  model,
  new StringOutputParser(),
]);

const parser3 = StructuredOutputParser.fromZodSchema(
  z.object({
    passRate: z
      .number()
      .describe(
        "the probability of the student passing the class, should be titled passRate",
      ),
    report: z
      .string()
      .describe(
        "a string value containing the report of the student's strengths and weaknesses, should be titled report",
      ),
  }),
);

const prompt3 =
  PromptTemplate.fromTemplate(`Please be respectful and encouraging when answering this prompt: Given the following answers {answers} to the questions {questions}, 
  give the user a probability of passing (a number value) and a 3 sentence report that they can use to better prepare themselves.\n{format_instructions}\n{answers}\n{questions}\n{answers}\n`);

const chain3 = RunnableSequence.from([prompt3, model, parser3]);

async function main() {
  // const { pros, prerequisites, cons } = await chain1.invoke({
  //   name: "E. Dijkstra",
  //   class: "CSE 130",
  //   description:
  //     "Covers the principles governing computer-systems design and complexity; familiarity with memory, storage, and networking; concurrency and synchronization; layering (abstraction and modularity); naming; client-server and virtualized system models; and performance. Requires significant programming projects demonstrating mastery of these concepts. Prerequisite(s): CSE 15 and CSE 15L, or CSE 13S and CMPM 35; or CSE 13E and CMPM 35, or CSE 101.",
  //   reviews: [
  //     "Review: This class was challenging but extremely rewarding. Professor Dijkstra's lectures were clear and insightful. The projects helped solidify my understanding of the concepts.",
  //     "Review: I found this class to be quite difficult. The workload was heavy and the material was complex. Professor Dijkstra's teaching style was not very engaging.",
  //     "Review: CSE 130 with Professor Dijkstra was one of the best classes I've taken. The course content was interesting and relevant. The professor was always available to help and provided valuable feedback on assignments.",
  //   ].join("\n"),
  //   format_instructions: parser1.getFormatInstructions(),
  // });

  // const response2 = await chain2.invoke({
  //   pros: pros.join("\n"),
  //   prerequisite: prerequisites.join("\n"),
  //   cons: cons.join("\n"),
  // });

  // console.log(response2);

  const response3 = await chain3.invoke({
    questions: [
      "How familiar are you with C++",
      "How familiar are you with Linux",
    ].join("\n"),
    answers: ["Slightly familiar", "Slightly familiar"].join("\n"),
    format_instructions: parser3.getFormatInstructions(),
  });

  console.log(response3);
}

export { chain1, chain2, chain3, parser1, parser3 };

main().then(() => process.exit(0));
