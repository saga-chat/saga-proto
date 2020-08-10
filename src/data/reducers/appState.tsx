import { Id } from "../types/entity";
import { ChildMap, SagaEvent, Message } from "../types/events";
import buildTree, { IdToEvent } from "../utils/buildTree";
import isSubstantiveMessage from "../utils/isSubstantiveMessage";
import uniqid from "uniqid";
import getBottomChild from "../utils/getBottomChild";

export enum View {
  TREE = 0,
  LEAF = 1,
}

export enum ContentTab {
  SUBSTANTIVES = 0,
  REACTIONS = 1,
}

export type AppStateAction =
  | { type: "PUSH_PARENT"; parent: Id | null }
  | { type: "CHANGE_VIEW"; view: View }
  | { type: "CHANGE_CONTENT_TAB"; contentTab: ContentTab }
  | { type: "SET_REPLYING_TO"; replyingTo: Id | null }
  | { type: "SEND_EVENT"; event: SagaEvent }
  | { type: "SEND_REACTION"; emoji: string; parent: Id };

export const pushParent = (parent: Id | null): AppStateAction => ({
  type: "PUSH_PARENT",
  parent,
});

export const setReplyingTo = (replyingTo: Id | null): AppStateAction => ({
  type: "SET_REPLYING_TO",
  replyingTo,
});

export const sendReaction = (emoji: string, parent: Id): AppStateAction => ({
  type: "SEND_REACTION",
  emoji,
  parent,
});

export type AppStateDispatcher = React.Dispatch<AppStateAction>;

export interface AppState {
  currentView: View;
  currentContentTab: ContentTab;
  currentParent: Id | null;
  childMap: ChildMap;
  idToEvent: IdToEvent;
  treeTop: Id[];
  replyingTo: Id | null;
  myID: Id;
}

export const initAppState = ({
  events,
  myID,
}: {
  events: SagaEvent[];
  myID: Id;
}): AppState => {
  const { childMap, idToEvent, treeTop } = buildTree(events);
  return {
    currentView: View.TREE,
    currentContentTab: ContentTab.SUBSTANTIVES,
    currentParent: null,
    childMap,
    idToEvent,
    treeTop,
    replyingTo: null,
    myID,
  };
};

export const appStateReducer = (
  state: AppState,
  action: AppStateAction
): AppState => {
  switch (action.type) {
    case "CHANGE_CONTENT_TAB":
      return {
        ...state,
        currentContentTab: action.contentTab,
        replyingTo: null,
      };
    case "CHANGE_VIEW":
      return { ...state, currentView: action.view, replyingTo: null };
    case "PUSH_PARENT":
      const commonState = {
        ...state,
        currentContentTab: ContentTab.SUBSTANTIVES,
        currentView: View.TREE,
        currentParent: action.parent,
        replyingTo: null,
      };
      if (
        action.parent !== null &&
        state.childMap[action.parent].filter((child: Id) =>
          isSubstantiveMessage(child, state.idToEvent, state.childMap)
        ).length === 0
      ) {
        return {
          ...commonState,
          currentContentTab: ContentTab.REACTIONS,
        };
      }
      return commonState;
    case "SET_REPLYING_TO":
      return { ...state, replyingTo: action.replyingTo };
    case "SEND_EVENT":
      const base = {
        ...state,
        idToEvent: { ...state.idToEvent, [action.event.id]: action.event },
        childMap: { ...state.childMap, [action.event.id]: [] },
      };
      if (action.event.parent !== null) {
        return {
          ...base,
          childMap: {
            ...base.childMap,
            [action.event.parent]: [
              ...base.childMap[action.event.parent],
              action.event.id,
            ],
          },
        };
      }
      return { ...base, treeTop: [...state.treeTop, action.event.id] };
    case "SEND_REACTION":
      const below = getBottomChild(
        state.idToEvent,
        state.childMap,
        action.parent
      );
      const reactionEvent: Message = {
        kind: "message",
        parent: action.parent,
        below,
        seen_by: [state.myID],
        creator: state.myID,
        created: new Date().getTime(),
        id: uniqid(),
        contents: [
          {
            kind: "reaction",
            emoji: action.emoji,
            range: null,
            contentIndex: 0,
            creator: state.myID,
            id: uniqid(),
            created: new Date().getTime(),
          },
        ],
      };
      return appStateReducer(state, {
        type: "SEND_EVENT",
        event: reactionEvent,
      });
    default:
      console.error(`Cannot handle action ${JSON.stringify(action)}`);
      return state;
  }
};
