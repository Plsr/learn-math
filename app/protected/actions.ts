import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getActiveGame = async () => {
  const supabase = await createClient();
  const { data: activeGame, error } = await supabase
    .from("game")
    .select("*")
    .eq("active", true)
    .single();

  if (activeGame) {
    return activeGame;
  } else {
    return null;
  }
};

export const createNewGame = async () => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("game")
    .update({ active: false })
    .eq("active", true);

  if (error) {
    console.error(error);
    return null;
  }

  const { data: game, error: gameError } = await supabase
    .from("game")
    .insert({ type: "add", rounds: 10, active: true })
    .select()
    .single();

  if (gameError) {
    console.error(gameError);
    return null;
  }

  redirect(`/protected/games/${game.id}/play`);
};
