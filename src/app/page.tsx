// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HydrateClient } from "~/trpc/server";
import Generator from "./_components/Generator/generator";

export default async function Home() {
  return (
    <HydrateClient>
      <>
        <Generator />
      </>
    </HydrateClient>
  );
}
