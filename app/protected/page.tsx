import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { redirect } from "next/navigation";
import { createNewGame, getActiveGame } from "./actions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const activeGame = await getActiveGame();

  return (
    <div>
      {activeGame && (
        <div className="flex flex-row items-center justify-between w-[600px] bg-purple-100 border-2 border-purple-200 rounded-lg p-4">
          <div>
            <h1 className="text-lg text-purple-950 font-bold m-0">
              You still have an open game
            </h1>
            <p className="m-0 p-0 text-purple-900">
              {activeGame.type} - {activeGame.rounds}
            </p>
          </div>
          <div>
            <Link
              className="bg-purple-500 text-white p-3 mt-4  rounded-lg"
              href={`/protected/games/${activeGame.id}/play`}
            >
              Continue
            </Link>
          </div>
        </div>
      )}

      <form
        action={async (_formData: FormData) => {
          "use server";
          await createNewGame();
        }}
      >
        <button type="submit">New Game</button>
      </form>
    </div>
  );
}
