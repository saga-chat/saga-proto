import styled from "styled-components";
import * as React from "react";
import { Message, Embellishment, IdArr, SagaEvent } from "../../types/events";
import Content from "./Content";
import { purple_primary } from "../../colors";
import { Room } from "../../types/room";
import buildTree from "../../types/utils/buildTree";
import { id } from "../../types/entity";
import BubbleAndControls from "./BubbleAndControls";
import { BubbleMode } from "./Bubble";

const Conversation: React.FC<{ room: Room }> = ({ room }) => {
  const { events } = room;
  const [tree, clustered] = buildTree(events);
  console.log(tree, clustered);
  return (
    <div>
      {clustered.map((cluster: IdArr, i: number) => (
        <div key={i}>
          {cluster.map((id: id, j: number) => {
            if (tree[id].kind === "message") {
              // to get embellishments, filter children
              const embellishments =
                tree[id].children !== undefined
                  ? (tree[id].children
                      ?.flat()
                      .map((ch: any) => tree[ch])
                      .filter(
                        (evt: SagaEvent) => evt.kind === "embellishment"
                      ) as Embellishment[])
                  : [];
              return (
                <BubbleAndControls
                  key={j}
                  selected={null}
                  message={tree[id] as any}
                  embellishments={embellishments}
                  onReplyClick={console.log}
                  mode={
                    cluster.length === 1
                      ? BubbleMode.singleton
                      : j === 0
                      ? BubbleMode.top
                      : j === cluster.length - 1
                      ? BubbleMode.bottom
                      : BubbleMode.middle
                  }
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
