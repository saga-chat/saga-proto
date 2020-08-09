import { MessageContent, SagaEvent, ChildMap, Message } from "../types/events";
import { Id } from "../types/entity";
import { idToEvent } from "./buildTree";

const isTerminalReaction = (id: Id, tree: idToEvent, childMap: ChildMap) =>
  (tree[id] as Message).contents.every(
    ({ kind }: MessageContent) => kind === "reaction"
  ) && childMap[id].length === 0;

export default isTerminalReaction;
