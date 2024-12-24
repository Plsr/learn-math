import clsx from "clsx";
import { XIcon } from "lucide-react";

import { CheckIcon } from "lucide-react";

export const ResultsVisualization = ({
  rounds,
  answers,
}: {
  rounds: number;
  answers: boolean[];
}) => {
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: rounds }).map((_, index) => {
        return (
          <>
            {answers.length > index ? (
              <>
                {Boolean(answers[index]) ? <CorrectAnswer /> : <WrongAnswer />}
              </>
            ) : (
              <NoAnswer active={index === answers.length} />
            )}
          </>
        );
      })}
    </div>
  );
};

const CorrectAnswer = () => {
  return (
    <div className="rounded-full w-8 h-8 flex items-center justify-center border-2 bg-green-100 border-green-600">
      <CheckIcon className="w-4 h-4 text-green-700" />
    </div>
  );
};

const WrongAnswer = () => {
  return (
    <div className="rounded-full w-8 h-8 flex items-center justify-center border-2 bg-red-100 border-red-600">
      <XIcon className="w-4 h-4 text-red-700" />
    </div>
  );
};

const NoAnswer = ({ active = false }: { active: boolean }) => {
  return (
    <div
      className={clsx(
        "rounded-full w-8 h-8 flex items-center justify-center border-2 bg-slate-100 border-slate-400",
        active && "border-slate-600"
      )}
    />
  );
};
