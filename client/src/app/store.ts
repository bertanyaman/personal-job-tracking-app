import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import throttle from 'lodash.throttle';

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.jobs.items);
    localStorage.setItem('jobItems', serializedState);
  } catch {

  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('jobItems');
    if (serializedState === null) {
      return undefined;
    }
    return {
      jobs: {
        items: JSON.parse(serializedState),
        priorities: []
      }
    }
  }
  catch (error) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    jobs: jobsReducer
  },
  preloadedState: loadState()
});

store.subscribe(
  throttle(() => saveState(store.getState()), 1000)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
