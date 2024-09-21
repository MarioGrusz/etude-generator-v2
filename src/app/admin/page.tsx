import { HydrateClient } from "~/trpc/server";
import AdminPanel from "~/app/_components/Admin";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <AdminPanel />
      </>
    </HydrateClient>
  );
}
