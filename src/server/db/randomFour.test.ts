import { test } from "vitest";
//import { getRandomItems } from "./randomFour";
import { generateDynamicQuery } from "./getRandomItems/getRandomItems";

test("run random query", async () => {
  generateDynamicQuery({
    feature_id: 2,
    change_id: null,
    cause_id: null,
    character_id: 5,
  });
});
