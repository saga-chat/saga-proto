import { Id } from "../types/entity";
import { ChildMap } from "../types/events";
import { IdToEvent } from "./buildTree";

const getBottomChild = (
  idToEvent: IdToEvent,
  childMap: ChildMap,
  treeTop: Id[],
  parent: Id | null
): Id | null => {
  const cm = parent === null ? treeTop : childMap[parent];
  if (cm.length === 0) {
    return null;
  }
  const belows: Id[] = cm
    .map((child: Id) => idToEvent[child].below)
    .filter((child: Id | null) => child !== null) as Id[];
  return cm.find((child: Id) => belows.indexOf(child) < 0) || null;
};

export default getBottomChild;
