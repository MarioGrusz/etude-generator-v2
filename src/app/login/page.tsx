import { HydrateClient } from "~/trpc/server";
import LoginForm from "~/app/_components/Login";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <LoginForm />
      </>
    </HydrateClient>
  );
}
