const chatStates = {
  roomlist: [],
  room: null,
  chatmenutab: "1",
  invitelist: [],
  invitemode: false,
  infinitestate: false,
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

//방 초대모드
export const invitemode_Action = (data) => {
  return {
    type: "INVITEMODE_SET",
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

//채팅방 무한 스크롤링
export const infinitestate_Action = (data) => {
  return {
    type: "INFINTE_SET",
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
        invitemode: true,
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
    case "INVITEMODE_SET":
      return {
        ...state,
        invitemode: action.data,
      };
    case "INVITE_SET":
      return {
        ...state,
        invitelist: action.data,
      };
    case "INFINTE_SET":
      return {
        ...state,
        infinitestate: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
