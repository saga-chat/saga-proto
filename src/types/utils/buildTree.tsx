import { SagaEvent, Clusters, ChildMap } from "../events";
import { Id } from "../entity";
export type idToEvent = { [id: string]: SagaEvent };

const buildTree = (events: SagaEvent[]): [idToEvent, Id[], ChildMap] => {
  const byID: idToEvent = {};
  const treeTop: Id[] = [];
  const childMap: ChildMap = {};
  for (const evt of events) {
    byID[evt.id] = evt;
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
  return [byID, treeTop, childMap];
};

export default buildTree;
