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
      <p className="text-lg mb-4 text-center font-medium">{props.question}</p>
      <div className="flex flex-col items-center h-12 w-full mb-6">
        <div className="flex-grow h-full flex justify-around">
          {props.options.map((option) => {
            if (props.circles) {
              return (
                <button
                  onClick={() => props.handleChoose(option)}
                  key={`${props.question} -> ${option}`}
                  className="transition-all duration-150 mx-3 w-12 h-12 rounded-full border-1 border-white hover:bg-white hover:text-black flex items-center justify-center"
                >
                  <p className="font-sans font-medium">{option}</p>
                </button>
              );
            }
            return (
              <button
                onClick={() => props.handleChoose(option)}
                key={`${props.question} -> ${option}`}
                className="transition-all duration-150 mx-3 w-16 h-12 rounded-lg border-1 border-white hover:bg-white hover:text-black flex items-center justify-center"
              >
                <p className="font-sans font-medium">{option}</p>
              </button>
            );
          })}
        </div>
      </div>
      <button>
        <p
          onClick={() => props.handleSkip()}
          className="text-xs text-white border-1 p-2 px-3 mb-2 rounded-full hover:text-black hover:bg-white font-sans"
        >
          Skip
        </p>
      </button>
      <button>
        <p
          onClick={() => props.handleBack()}
          className="text-xs border-1 rounded-full p-2 px-3 text-white hover:text-black hover:bg-white font-sans my-1"
        >
          Back
        </p>
      </button>
    </div>
  );
}
