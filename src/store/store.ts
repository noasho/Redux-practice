import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './ToDoSlice';

const store = configureStore({
    reducer: {
        ToDo: todoReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store
