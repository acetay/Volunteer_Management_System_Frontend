export const initialState = {
  volunteers: [],
  volunteersBySearch: [],
  profiles: [],
  programs: [],
  enrolments: [],
  profile: {},
  program: {},
  volunteerInEnrolment: [],
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
    case 'GET_VOLUNTEERS_BY_SEARCH':
      return {
        ...state,
        volunteers: action.volunteers,
        isLoading: false,
      };
    case 'GET_VOLUNTEERS_PROFILES':
      return {
        ...state,
        volunteers: action.payload.volunteers,
        profiles: action.payload.profiles,
        isLoading: false,
      };
    case 'GET_PROGRAMS_ENROLMENTS':
      return {
        ...state,
        programs: action.payload.programs,
        enrolments: action.payload.enrolments,
        isLoading: false,
      };
    case 'ADD_NEW_PROGRAM':
      return {
        ...state,
        programs: [...state.programs, action.program],
      };
    case 'EDIT_PROGRAM':
      const editedPrograms = state.programs.map((program) =>
        program.id === action.id ? action.program : program
      );
      return {
        ...state,
        programs: [...editedPrograms],
      };
    case 'GET_VOLUNTEER_PROFILE':
      return {
        ...state,
        profile: action.profile,
        isLoading: false,
      };
    case 'EDIT_VOLUNTEER_PROFILE':
      const editedProfiles = state?.profiles.map((x) =>
        x.id === action.profile.id ? action.profile : x
      );
      return {
        ...state,
        profiles: editedProfiles,
      };

    case 'GET_VOLUNTEER_AVAIL':
      return {
        ...state,
        availabilities: action.availabilities,
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
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};
