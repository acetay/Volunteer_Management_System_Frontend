export const initialState = {
  volunteers: [],
  programs: [],
  enrolments: [],
  availabilities: [],
  isLoading: false,
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'GET_VOLUNTEERS':
      return {
        ...state,
        volunteers: action.volunteers,
        isLoading: false,
      };
    default:
      return state;
  }
};
