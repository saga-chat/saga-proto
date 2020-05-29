import Entity from "./entity";

interface Evt extends Entity {
  seen_by: string[];
}

interface Markdown {
  kind: "markdown";
  contents: string;
}

interface Image {
  kind: "image";
  uri: string;
}

type MessageContent = Markdown | Image;

interface Message extends Evt {
  kind: "message";
  parent: string | null;
  below: string | null;
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

export type Event = Message | MembershipChanged;
