import { SagaEvent, Clusters, TreeEvt } from "../events";
import clusterIDs from "./clusterIDs";
import { Id } from "../entity";
export type idToEvent = { [id: string]: TreeEvt };

const buildTree = (events: SagaEvent[]): [idToEvent, Clusters] => {
  const byID: idToEvent = {};
  const treeTop: Id[] = [];
  for (const evt of events) {
    byID[evt.id] = { ...evt, children: [] };

    if (evt.parent && byID[evt.parent]) {
      byID[evt.parent].children = clusterIDs(byID, evt.id);
    }

    if (evt.parent === null) {
      treeTop.push(evt.id);
    }
  }
  return [byID, clusterIDs(byID, treeTop[treeTop.length - 1])];
};

export default buildTree;
