import { ResultsVisualization } from "@/components/ResultsVisualization";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const getGame = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("game")
    .select("*")
    .eq("id", id)
    .single();
  return data;
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gameId = (await params).id;
  const game = await getGame(gameId);
  console.log(game);

  if (!game) {
    return notFound();
  }

  const correctAnswers =
    game.answers?.filter((answer) => answer === true) || [];

  const percentageCorrect = (correctAnswers.length / game.rounds) * 100;

  const resultsHeadline = () => {
    if (percentageCorrect === 100) {
      return "🌟 Perfect";
    }
    if (percentageCorrect >= 90) {
      return "✨ Excellent";
    }
    if (percentageCorrect >= 80) {
      return "👏 Good";
    }
    if (percentageCorrect >= 70) {
      return "👍 Nice";
    }
    if (percentageCorrect >= 40) {
      return "🧸 Not Bad";
    }
    return "🥺 Better luck next time";
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{resultsHeadline()}</h1>
      <div className="text-2xl  mb-4">
        You got {correctAnswers?.length} out of {game?.rounds} correct
      </div>
      <ResultsVisualization answers={game.answers || []} rounds={game.rounds} />
      <Link
        className="bg-purple-700 text-white p-3 mt-4 inline-block rounded-lg"
        href="/protected/games/add"
      >
        Play again
      </Link>
    </div>
  );
}
