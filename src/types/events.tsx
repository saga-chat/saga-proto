import Entity, { id, userid } from "./entity";
export type IdArr = id[];
export type clusteredIDs = IdArr[];
export interface Evt extends Entity {
  seen_by: userid[];
  below: id | null;
  parent: id | null;
  children?: clusteredIDs;
}

interface Markdown {
  kind: "markdown";
  contents: string;
}

interface Image {
  kind: "image";
  uri: string;
}

export type MessageContent = Markdown | Image;

export interface Message extends Evt {
  kind: "message";
  contents: MessageContent[];
}

export interface Range {
  start: number;
  end: number;
}
export interface Highlight {
  range: Range | null;
  kind: "highlight";
}

export interface QuoteReply {
  kind: "quote_reply";
  range: Range | null;
  contents: MessageContent[];
}

export interface Reaction {
  kind: "reaction";
  emoji: string;
  range: Range | null;
}

export type EmbellishmentContent = Highlight | QuoteReply | Reaction;

export interface Embellishment extends Evt {
  kind: "embellishment";
  contentIndex: number | null;
  contents: EmbellishmentContent[];
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

export type SagaEvent = Message | Embellishment | MembershipChanged;
