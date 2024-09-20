import { HydrateClient } from "~/trpc/server";
import AdminPanel from "../_components/Admin/Admin";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <AdminPanel />
      </>
    </HydrateClient>
  );
}
