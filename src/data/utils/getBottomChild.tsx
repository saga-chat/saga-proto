import { Id } from "../types/entity";
import { ChildMap } from "../types/events";
import { IdToEvent } from "./buildTree";

const getBottomChild = (
  idToEvent: IdToEvent,
  childMap: ChildMap,
  parent: Id
): Id | null => {
  if (childMap[parent].length === 0) {
    return null;
  }
  const belows: Id[] = childMap[parent]
    .map((child: Id) => idToEvent[child].below)
    .filter((child: Id | null) => child !== null) as Id[];
  return (
    childMap[parent].find((child: Id) => belows.indexOf(child) < 0) || null
  );
};

export default getBottomChild;
