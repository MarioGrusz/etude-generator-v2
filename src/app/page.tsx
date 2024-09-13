/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HydrateClient } from "~/trpc/server";
import Generator from "./_components/generator";

export default async function Home() {
  return (
    <HydrateClient>
      <main style={{ padding: "1rem 0" }}>
        <Generator />
      </main>
    </HydrateClient>
  );
}
