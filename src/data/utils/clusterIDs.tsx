import { SagaEvent, Clusters } from "../types/events";
import { idToEvent } from "./buildTree";
import { Id } from "../types/entity";
import { transform } from "lodash";

const clusterIDs = (events: idToEvent, seed: Id, subset?: Id[]): Clusters => {
  let cluster: Id[];
  if (subset === undefined) {
    cluster = [seed];
    let prev = events[seed].below;
    while (prev) {
      cluster = [prev, ...cluster];
      prev = events[prev].below;
    }
  } else {
    cluster = subset;
  }
  const clustered = transform(
    cluster,
    (clustered: Clusters, current: Id) => {
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

  return clustered;
};

export default clusterIDs;
