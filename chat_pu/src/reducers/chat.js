const chatStates = {
  roomlist: [],
  room: null,
  chatmenutab: "1",
  invitelist: [],
};

//쳇매뉴의 탭 선택
export const changeTab_Action = (data) => {
  return {
    type: "CHANGE_TAB",
    data,
  };
};
//새방을 만드므로 room_set초기화 하고 chatmenutab 을 2로 변환
//쳇매뉴의 탭 선택
export const newroomclick_Action = (data) => {
  return {
    type: "NEWROOM_CLICK",
    data,
  };
};

//유저의 방목록을 리듀서에 저장
export const roomlist_Action = (data) => {
  return {
    type: "ROOMLIST_SET",
    data,
  };
};

//유저의 방목록을 클릭하면 리듀서에 저장
export const room_Action = (data) => {
  return {
    type: "ROOM_SET",
    data,
  };
};

//초대유저의 목록에 저장
export const invite_Action = (data) => {
  return {
    type: "INVITE_SET",
    data,
  };
};

const reducer = (state = chatStates, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return {
        ...state,
        chatmenutab: action.data,
      };
    case "NEWROOM_CLICK":
      return {
        ...state,
        chatmenutab: action.data,
        room: null,
      };
    case "ROOMLIST_SET":
      return {
        ...state,
        roomlist: action.data,
      };
    case "ROOM_SET":
      return {
        ...state,
        room: action.data,
      };
    case "INVITE_SET":
      return {
        ...state,
        invitelist: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
