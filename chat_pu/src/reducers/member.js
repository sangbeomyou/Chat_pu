export const initialState = {
  tree_list: null,
  member_list: [],
  member_info: null,
  expandedKeys: [],
  selectedKeys: null,
  searchkeys: null,
};

export const tree_Action = (data) => {
  return {
    type: "TREE_LOAD",
    data,
  };
};

export const memberlist_Action = (data) => {
  return {
    type: "MEMBERLIST_LOAD",
    data,
  };
};

export const memberinfo_Action = (data) => {
  return {
    type: "MEMBERINFO_LOAD",
    data,
  };
};

export const expanded_Action = (data) => {
  return {
    type: "EXPANDED_KEYS",
    data,
  };
};

export const selected_Action = (data) => {
  return {
    type: "SELECTED_KEYS",
    data,
  };
};

export const search_Action = (data) => {
  return {
    type: "SEARCH_KEYS",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TREE_LOAD":
      return {
        ...state,
        tree_list: action.data,
      };
    case "MEMBERLIST_LOAD":
      return {
        ...state,
        member_list: action.data,
      };
    case "MEMBERINFO_LOAD":
      return {
        ...state,
        member_info: action.data,
      };
    case "EXPANDED_KEYS":
      return {
        ...state,
        expandedKeys: action.data,
      };
    case "SELECTED_KEYS":
      return {
        ...state,
        searchkeys: null,
        member_info: null,
        selectedKeys: action.data,
      };
    case "SEARCH_KEYS":
      return {
        ...state,
        selectedKeys: null,
        member_info: null,
        searchkeys: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
