import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataType } from '../../entities/DataType';
import { PriorityType } from '../../entities/Types';

export interface JobsState {
    items: Array<DataType>,
    priorities: Array<{ value: PriorityType, label: PriorityType }>
}

const initialState: JobsState = {
    items: [],
    priorities: []
};

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<DataType>) => {
            state.items.push(action.payload);
        },
        remove: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(i => i.key === action.payload);
            if (index > -1) {
                state.items.splice(index, 1);
            }
        },
        update: (state, action: PayloadAction<DataType>) => {
            state.items = state.items.map(job => {
                if (job.key === action.payload.key) {
                    return { ...job, ...action.payload };
                }
                return job;
            });
        },
        loadPriorities: (state, action: PayloadAction<Array<{ value: PriorityType, label: PriorityType }>>) => {
            state.priorities = action.payload;
        }
    }
});

export const { add, remove, update, loadPriorities } = jobsSlice.actions;
export default jobsSlice.reducer;