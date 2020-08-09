import { Id } from "../types/entity";
import { SagaEvent } from "../types/events";

const isUnread = (evt: SagaEvent, myId: Id) => evt.seen_by.indexOf(myId) < 0;
export default isUnread;
