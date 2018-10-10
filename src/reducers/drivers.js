const initialState = {
  drivers: [],
  totalPages: 0,
  loading: false,
  error: null,
};

export default function driversReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_DRIVERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_DRIVERS_SUCCESS':
      return {
        ...state,
        drivers: action.drivers,
        totalPages: action.totalPages,
        loading: false,
      };
    case 'LOAD_DRIVERS_ERROR':
      return {
        ...state,
        drivers: action.drivers,
        loading: false,
        error: action.error,
      };
    case 'LOAD_DRIVER_DETAIL_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOAD_DRIVER_DETAIL_SUCCESS':
      return {
        ...state,
        loading: true,
        drivers: [...state.drivers.filter(driver => driver.driverId !== action.driver.driverId), action.driver],
      };
    default:
      return state;
  }
}
