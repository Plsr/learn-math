import { AdditionGame } from "@/components/AdditionGame";
import { ResultsVisualization } from "@/components/ResultsVisualization";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

// Create a random integer between min and max
const createRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getGame = async (gameId: string) => {
  "use server";
  const supabase = await createClient();
  //
  // get user's games
  const { data: activeGame, error } = await supabase
    .from("game")
    .select("*")
    .eq("id", gameId)
    .single();

  return activeGame;
};

export default async function AddGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const game = await getGame((await params).id);

  if (!game) {
    return notFound();
  }

  console.log(game.answers);

  return (
    <div>
      <ResultsVisualization answers={game.answers || []} rounds={game.rounds} />
      <AdditionGame
        key={game.id + (game.answers?.length || 0)}
        number1={createRandomNumber(1, 10)}
        number2={createRandomNumber(1, 10)}
        gameId={game.id}
      />
    </div>
  );
}
