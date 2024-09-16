import { HydrateClient } from "~/trpc/server";
import AdminPanel from "../_components/Admin/admin";

export default async function admin() {
  return (
    <HydrateClient>
      <>
        <AdminPanel />
      </>
    </HydrateClient>
  );
}
