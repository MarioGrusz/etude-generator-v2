import { HydrateClient } from "~/trpc/server";
import AdminPanel from "~/app/_components/AdminPanel";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <AdminPanel />
      </>
    </HydrateClient>
  );
}
