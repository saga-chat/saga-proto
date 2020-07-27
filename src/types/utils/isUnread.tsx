import { Id } from "../entity";
import { SagaEvent } from "../events";

const isUnread = (evt: SagaEvent, myId: Id) => evt.seen_by.indexOf(myId) < 0;
export default isUnread;
