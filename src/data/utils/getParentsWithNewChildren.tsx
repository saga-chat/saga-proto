import { IdToEvent } from "./buildTree";
import { uniq } from "lodash";
import { SagaEvent } from "../types/events";
import { Id } from "../types/entity";
import isUnread from "./isUnread";

const getParentsWithNewChildren = (tree: IdToEvent, myId: Id) =>
  uniq(
    Object.values(tree)
      .filter(
        (evt: SagaEvent) =>
          isUnread(evt, myId) &&
          (evt.parent === null || !isUnread(tree[evt.parent], myId)) // ensures no duplicate clusters
      )
      .map((evt: SagaEvent) => (evt.parent === null ? evt.id : evt.parent))
  );

// TODO: sort by time?

export default getParentsWithNewChildren;
