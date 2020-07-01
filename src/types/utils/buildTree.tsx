import { SagaEvent, Clusters } from "../events";
import clusterIDs from "./clusterIDs";
import { Id } from "../entity";
export type idToEvent = { [id: string]: SagaEvent };

const buildTree = (events: SagaEvent[]): [idToEvent, Clusters] => {
  const byID: idToEvent = {};
  const treeTop: Id[] = [];
  for (const evt of events) {
    byID[evt.id] = evt;

    if (evt.parent && byID[evt.parent]) {
      if (byID[evt.parent].children === undefined) {
        byID[evt.parent].children = [[evt.id]];
      } else if (byID[evt.parent].children !== undefined) {
        byID[evt.parent].children = clusterIDs(byID, evt.id);
      }
    }

    if (!evt.parent) {
      treeTop.push(evt.id);
    }
  }
  return [byID, clusterIDs(byID, treeTop[treeTop.length - 1])];
};

export default buildTree;
