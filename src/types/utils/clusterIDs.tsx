import { SagaEvent, clusteredIDs } from "../events";
import { idToEvent } from "./buildTree";
import { Id } from "../entity";
import { transform } from "lodash";

const clusterIDs = (events: idToEvent, seed: Id): clusteredIDs => {
  let cluster: Id[] = [seed];
  let prev = events[seed].below;
  while (prev) {
    cluster = [prev, ...cluster];
    prev = events[prev].below;
  }
  return transform(
    cluster,
    (clustered: clusteredIDs, current: Id) => {
      if (clustered.length === 0) {
        clustered.push([current]);
      } else {
        const last = clustered[clustered.length - 1];
        if (
          events[last[last.length - 1]]?.creator === events[current].creator
        ) {
          (clustered[clustered.length - 1] as any).push(current);
        } else {
          clustered.push([current]);
        }
      }
    },
    []
  );
};

export default clusterIDs;
