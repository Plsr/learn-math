import { AdditionGame } from "@/components/AdditionGame";
import { ResultsVisualization } from "@/components/ResultsVisualization";
import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import { CheckIcon, CrossIcon, XIcon } from "lucide-react";
import { notFound } from "next/navigation";

// Create a random integer between min and max
const createRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getGame = async (userId: string) => {
  "use server";
  const supabase = await createClient();
  //
  // get user's games
  const { data: games, error } = await supabase
    .from("game")
    .select("*")
    .eq("user_id", userId);

  if (games) {
    const unfinishedGames = games.filter((game) => {
      if (!game.answers) {
        return true;
      }
      return game.answers!.length < game.rounds;
    });

    if (unfinishedGames.length > 0) {
      console.log("still have an unfinished Game");
      console.log(unfinishedGames);
      console.log(unfinishedGames[0]);
      return unfinishedGames[0];
    } else {
      const { data: game } = await supabase
        .from("game")
        .insert({ type: "add", rounds: 10 })
        .select()
        .single();

      console.log("created new game");
      console.log(game);
      return game;
    }
  }
};

export default async function AddGamePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const game = await getGame(user!.id);

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
