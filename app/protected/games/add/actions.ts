"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addAnswer = async (correct: boolean, gameId: number) => {
  const supabase = await createClient();

  const { data: game, error: gameError } = await supabase
    .from("game")
    .select("answers")
    .eq("id", gameId)
    .single();

  if (gameError || !game) {
    console.error(gameError.code + " " + gameError.message);
    return encodedRedirect("error", "/sign-up", gameError.message);
  }

  const gameAnswers = game.answers ?? [];

  const { data, error } = await supabase
    .from("game")
    .update({
      answers: [...gameAnswers, correct],
    })
    .eq("id", gameId)
    .select()
    .single();

  if (data && data.answers && data.rounds) {
    console.log(data.answers.length);
    console.log(data.rounds - 1);
    if (data.answers.length === data.rounds) {
      console.log("game finished");
      redirect(`/protected/games/tmp/${gameId}/results`);
    }
  }

  revalidatePath("/protected/games/add");
};
