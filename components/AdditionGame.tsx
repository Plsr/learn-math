"use client";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  SendHorizonal,
  SendHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import Confetti from "react-confetti";

export const AdditionGame = () => {
  const [number1, setNumber1] = useState(createRandomNumber(1, 50));
  const [number2, setNumber2] = useState(createRandomNumber(1, 20));
  const [answer, setAnswer] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (number1 + number2 === parseInt(e.currentTarget.answer.value)) {
      setCorrect(true);
    }
    setSubmitted(true);
  };

  const reset = () => {
    setNumber1(createRandomNumber(1, 10));
    setNumber2(createRandomNumber(1, 10));
    setAnswer(null);
    setCorrect(false);
    setSubmitted(false);
  };

  const handleNextClick = () => {
    reset();
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (number1 + number2 === parseInt(answer ?? "0")) {
      setCorrect(true);
    }
    setSubmitted(true);
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-4 justify-center">
        <NumberDisplay number={number1} />{" "}
        <span className="font-bold text-4xl">+</span>{" "}
        <NumberDisplay number={number2} /> =
        <input
          className="flex items-center justify-center text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-l-8 border-b-8 border-gray-200 rounded-lg w-32 p-4 text-4xl font-bold"
          type="number"
          name="answer"
          value={answer ?? ""}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          onClick={submitted ? undefined : handleSubmitClick}
          disabled={!answer}
          className={clsx(
            "bg-purple-500 border-2 border-purple-700 rounded-lg  px-8 py-6 text-4xl font-bold",
            submitted && correct && "bg-green-500 border-2 border-green-700",
            submitted && !correct && "bg-red-500 border-2 border-red-700"
          )}
        >
          {submitted && (
            <>
              {correct ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <X className="w-6 h-6 text-white" />
              )}
            </>
          )}
          {!submitted && <SendHorizontal className="w-6 h-6 text-white" />}
        </button>
      </div>
      {submitted && (
        <div className="mt-8 flex flex-row items-center justify-end gap-4">
          {correct && <Confetti />}
          <button
            className="flex gap-2 border shadow-md border-slate-400 bg-slate-100 px-6 py-4 rounded-lg font-bold"
            onClick={handleNextClick}
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

// Create a random integer between min and max
const createRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const NumberDisplay = ({ number }: { number: number }) => {
  return (
    <div className="border bg-white border-l-8 border-b-8 border-gray-200 rounded-lg  p-4 text-4xl font-bold">
      {number.toString()}
    </div>
  );
};
