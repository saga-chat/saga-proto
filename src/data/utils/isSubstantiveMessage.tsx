import {
  SubstantiveContent,
  MessageContent,
  SagaEvent,
  ChildMap,
} from "../types/events";
import { idToEvent } from "./buildTree";
import { Id } from "../types/entity";

const isSubstantiveMessage = (id: Id, tree: idToEvent, childMap: ChildMap) =>
  ((tree[id] as any).kind === "message" &&
    (tree[id] as any).contents.some(
      ({ kind }: MessageContent) => SubstantiveContent.indexOf(kind) > -1
    )) ||
  childMap[id].length > 0; // if it has a child it's substantive

export default isSubstantiveMessage;
