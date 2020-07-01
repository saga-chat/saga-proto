import Entity, { Id, userid } from "./entity";
export type Clustered = Id[];
export type Clusters = Clustered[];
export interface Evt extends Entity {
  seen_by: userid[];
  below: Id | null;
  parent: Id | null;
  children?: Clusters;
}

interface Markdown {
  kind: "markdown";
  contents: string;
}

interface Image {
  kind: "image";
  uri: string;
}
export interface Embellishment {
  contentIndex: number | null;
}
export interface Quote extends Embellishment {
  kind: "quote";
  range: Range | null;
}
export interface Range {
  start: number;
  end: number;
}
export interface Highlight extends Embellishment {
  range: Range | null;
  kind: "highlight";
}

export interface Reaction extends Embellishment {
  kind: "reaction";
  emoji: string;
  range: Range | null;
}

export type MessageContent = Markdown | Image | Quote | Highlight | Reaction;
export interface Message extends Evt {
  kind: "message";
  contents: MessageContent[];
}

interface Join {
  creator: string;
  kind: "join";
}

interface Leave {
  creator: string;
  kind: "leave";
}

interface Kick {
  creator: string;
  victim: string;
  kind: "kick";
}

type MembershipChange = Join | Leave | Kick;

interface MembershipChanged extends Evt {
  kind: "membership_change";
  contents: MembershipChange;
}

interface DeletedMessage extends Evt {
  kind: "deleted_message";
}

export type SagaEvent =
  | Message
  | Embellishment
  | MembershipChanged
  | DeletedMessage;
