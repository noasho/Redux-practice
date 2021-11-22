import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

interface InitialState {
    todoList: [{ mission: string, done: string }];
    status: string | null;
}

const initialState: InitialState = {
    todoList: [{ mission: "try this list out", done: "" }],
    status: 'fetch missions'

}

export const getTodoById = createAsyncThunk(
    "todo/fetchToDoById",
    async (todoId) => {
        const response = await todoId;
        return response;
    }
)

export const addNewToDo = (newToDo: { mission: string, done: string }): AppThunk => (
    dispatch,
    getState
) => {
    if (!newToDo.mission) {
        alert("Please enter a todo!");
    } else {
        dispatch(addTodo(newToDo));
    }
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ mission: string, done: string }>) => {
            state.todoList.push(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todoList.splice(action.payload, 1);
        },
        editTodo: (state, action: PayloadAction<{ text: string, id: number }>) => {
            state.todoList[action.payload.id].mission = action.payload.text;
        },
        doneTodo: (state, action: PayloadAction<{ done: string, id: number }>) => {
            state.todoList[action.payload.id].done = action.payload.done;
        }
    },
    extraReducers: builder => {
        builder.addCase(
            getTodoById.pending, (state) => { state.status = "loading..." }
        ).addCase(
            getTodoById.fulfilled, (state) => { state.status = null }
        ).addCase(getTodoById.rejected, (state) => { state.status = "rejected!" })
    }
})

export const { addTodo, deleteTodo, editTodo, doneTodo } = todoSlice.actions;
export const selectTodoList = (state: RootState) => state.ToDo.todoList;

const todoReducer = todoSlice.reducer;
export default todoReducer;