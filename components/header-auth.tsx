import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import * as Avatar from "@radix-ui/react-avatar";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Avatar.Root>
        <Avatar.Image />
        <Avatar.Fallback>G</Avatar.Fallback>
      </Avatar.Root>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/logg-inn">Logg inn</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/register-deg">Registrer deg</Link>
      </Button>
    </div>
  );
}
