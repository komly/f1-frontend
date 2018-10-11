import {
  LOAD_DRIVERS_REQUEST,
  LOAD_DRIVERS_SUCCESS,
  LOAD_DRIVERS_ERROR,
  LOAD_DRIVER_DETAIL_REQUEST,
  LOAD_DRIVER_DETAIL_SUCCESS,
  LOAD_DRIVER_DETAIL_ERROR,
} from '../types';

const initialState = {
  drivers: [],
  totalPages: 0,
  loading: false,
  error: null,
  driver: null,
  races: [],
};

export default function driversReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DRIVERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_DRIVERS_SUCCESS:
      return {
        ...state,
        drivers: action.drivers,
        totalPages: action.totalPages,
        loading: false,
      };
    case LOAD_DRIVERS_ERROR:
      return {
        ...state,
        drivers: action.drivers,
        loading: false,
        error: action.error,
      };
    case LOAD_DRIVER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_DRIVER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        driver: action.driver,
        races: action.races,
      };
    case LOAD_DRIVER_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
