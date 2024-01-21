import React from "react";

export default function SkillsComponent(props: {
  question: string;
  options: string[];
  circles: boolean;
  handleChoose: (option: string) => void;
  handleSkip: () => void;
  handleBack: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-lg mb-4 text-center">{props.question}</p>
      <div className="flex flex-col items-center h-12 w-full mb-4">
        <div className="flex-grow h-full flex justify-around">
          {props.options.map((option) => {
            if (props.circles) {
              return (
                <button
                  onClick={() => props.handleChoose(option)}
                  key={`${props.question} -> ${option}`}
                  className="transition-all duration-150 mx-4 w-12 h-12 rounded-full border-2 border-white hover:bg-white hover:text-black flex items-center justify-center"
                >
                  {option}
                </button>
              );
            }
            return (
              <button
                onClick={() => props.handleChoose(option)}
                key={`${props.question} -> ${option}`}
                className="transition-all duration-150 mx-4 w-20 h-12 rounded-md border-2 border-white hover:bg-white hover:text-black flex items-center justify-center"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <button>
        <p
          onClick={() => props.handleSkip()}
          className="text-sm text-gray-300 hover:text-gray-100"
        >
          Skip
        </p>
      </button>
      <button>
        <p
          onClick={() => props.handleBack()}
          className="text-sm text-gray-300 hover:text-gray-100"
        >
          Back
        </p>
      </button>
    </div>
  );
}
