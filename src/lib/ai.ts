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
      .describe("prerequisite courses needed to succeed, as a short list"),
    pros: z
      .array(z.string())
      .describe(
        "necessary concepts and skills to succeed, should be a short list",
      ),
    cons: z
      .array(z.string())
      .describe(
        "information about the professor to be aware of, should be a short list",
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
  generate a list of only 5 brief questions separated by that ask to rate a student's comfortability with topics
  to gauge the potential performance of a student in the class. Assume the student has not taken the class yet. 
  Ask questions about what grade they got in the prerequisite classes on a scale of A - F. Ask Yes/No questions.
  Make sure to ask at least one "comfortability rating" question, one "A-F" scale question, and one "Yes/No" question.`,
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
  give the user a probability of passing the class {course} with professor {professor} (a number value) and a 3 sentence report that they can use to better prepare themselves.\n{format_instructions}\n{answers}\n{questions}\n{answers}\n`);

const chain3 = RunnableSequence.from([prompt3, model, parser3]);

export { chain1, chain2, chain3, parser1, parser3 };
