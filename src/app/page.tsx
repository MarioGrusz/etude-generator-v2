// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HydrateClient } from "~/trpc/server";
import Generator from "~/app/_components/Generator/Generator";

export default async function Home() {
  return (
    <HydrateClient>
      <>
        <Generator />
      </>
    </HydrateClient>
  );
}
