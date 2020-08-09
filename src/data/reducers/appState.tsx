import { Id } from "../types/entity";
import { ChildMap, SagaEvent } from "../types/events";
import buildTree, { IdToEvent } from "../utils/buildTree";
import isSubstantiveMessage from "../utils/isSubstantiveMessage";

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
  | { type: "SET_REPLYING_TO"; replyingTo: Id };

export const pushParent = (parent: Id | null): AppStateAction => ({
  type: "PUSH_PARENT",
  parent,
});

export const setReplyingTo = (replyingTo: Id): AppStateAction => ({
  type: "SET_REPLYING_TO",
  replyingTo,
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
}

export const initAppState = ({ events }: { events: SagaEvent[] }): AppState => {
  const { childMap, idToEvent, treeTop } = buildTree(events);
  return {
    currentView: View.TREE,
    currentContentTab: ContentTab.SUBSTANTIVES,
    currentParent: null,
    childMap,
    idToEvent,
    treeTop,
    replyingTo: null,
  };
};

export const appStateReducer = (
  state: AppState,
  action: AppStateAction
): AppState => {
  switch (action.type) {
    case "CHANGE_CONTENT_TAB":
      return { ...state, currentContentTab: action.contentTab };
    case "CHANGE_VIEW":
      return { ...state, currentView: action.view };
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
    default:
      console.error(`Cannot handle action ${JSON.stringify(action)}`);
      return state;
  }
};
