import api from '../api';
import {
  LOAD_DRIVERS_REQUEST,
  LOAD_DRIVERS_SUCCESS,
  LOAD_DRIVERS_ERROR,
  LOAD_DRIVER_DETAIL_REQUEST,
  LOAD_DRIVER_DETAIL_SUCCESS,
  LOAD_DRIVER_DETAIL_ERROR,
} from '../types';

export const loadDrivers = currentPage => dispatch => {
  dispatch({
    type: LOAD_DRIVERS_REQUEST,
  });

  api
    .driversList(currentPage)
    .then(({ drivers, totalPages }) => {
      dispatch({
        type: LOAD_DRIVERS_SUCCESS,
        drivers,
        totalPages,
      });
    })
    .catch(e => {
      dispatch({
        type: LOAD_DRIVERS_ERROR,
        error: e.message || 'Internal server error',
      });
    });
};

export const loadDriverDetail = driverId => dispatch => {
  dispatch({
    type: LOAD_DRIVER_DETAIL_REQUEST,
  });

  api
    .loadDriverDetail(driverId)
    .then(({ driver, races }) => {
      dispatch({
        type: LOAD_DRIVER_DETAIL_SUCCESS,
        driver,
        races,
      });
    })
    .catch(e => {
      dispatch({
        type: LOAD_DRIVER_DETAIL_ERROR,
        error: e.message || 'Internal server error',
      });
    });
};
