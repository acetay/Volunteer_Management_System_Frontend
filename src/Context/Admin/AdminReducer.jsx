export const initialState = {
  profile: {},
  allAvailabilitiesOfVolunteers: [],
  volunteerInEnrolment: [],
  volunteerEnrolments: [],
  availabilities: [],
  isLoading: false,
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'GET_VOLUNTEER_PROFILE':
      return {
        ...state,
        profile: action.profile,
        isLoading: false,
      };
    case 'GET_ALL_AVAILABILITIES':
      return {
        ...state,
        allAvailabilitiesOfVolunteers:
          action.allAvailabilitiesOfVolunteers || [],
        isLoading: false,
      };
    case 'GET_VOLUNTEER_AVAIL':
      return {
        ...state,
        availabilities: action.availabilities,
        isLoading: false,
      };
    case 'GET_VOLUNTEER_ENROLMENTS':
      return {
        ...state,
        volunteerEnrolments: action.volunteerEnrolments,
      };
    case 'GET_VOLUNTEER_IN_ENROLMENT':
      return {
        ...state,
        volunteerInEnrolment: action.volunteerInEnrolment,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'OFF_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};
