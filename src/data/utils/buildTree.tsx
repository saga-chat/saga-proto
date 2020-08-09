import { SagaEvent, Clusters, ChildMap } from "../types/events";
import { Id } from "../types/entity";
export type IdToEvent = { [id: string]: SagaEvent };

const buildTree = (
  events: SagaEvent[]
): { idToEvent: IdToEvent; treeTop: Id[]; childMap: ChildMap } => {
  const idToEvent: IdToEvent = {};
  const treeTop: Id[] = [];
  const childMap: ChildMap = {};
  for (const evt of events) {
    idToEvent[evt.id] = evt;
    childMap[evt.id] = [];

    if (evt.parent !== null) {
      if (childMap[evt.parent]) {
        childMap[evt.parent].push(evt.id);
      } else {
        console.error(
          `Missing parent (nonsequential log!) for ${evt.id}->${evt.parent}`
        );
      }
    } else if (evt.parent === null) {
      treeTop.push(evt.id);
    }
  }
  return { idToEvent, treeTop, childMap };
};

export default buildTree;
