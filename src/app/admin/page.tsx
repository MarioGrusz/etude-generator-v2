import { HydrateClient } from "~/trpc/server";
import AdminPanel from "../_components/Admin";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <AdminPanel />
      </>
    </HydrateClient>
  );
}
