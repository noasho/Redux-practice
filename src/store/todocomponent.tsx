import { todoSlice, selectTodoList, addNewToDo, getTodoById } from "../store/ToDoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useState } from "react";
import { addTodo, deleteTodo, editTodo, doneTodo } from "../store/ToDoSlice";


const ToDo = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(selectTodoList);

    const [mission, setmission] = useState<string>("");
    const [editText, setText] = useState<string>("");
    const done = "Done!";
    const text = editText;


    return (
        <div>
            <input type="text" value={mission} onChange={(e) => { setmission(e.target.value); setText(e.target.value) }} placeholder="ToDo..." />
            <br></br>
            <button onClick={() => { dispatch(addNewToDo({ mission: mission, done: "not done" })); setmission("") }}>Add ToDo!</button>
            <h4>My List:</h4>
            <ol>
                {selector.map((obj, id) => {
                    return (
                        <div>
                            {!obj.done ? "" :
                                <li>
                                    <div>{obj.mission}</div>
                                    <div>{obj.done}</div>
                                    <div><button onClick={() => dispatch(deleteTodo(id))}>delete</button></div>
                                    <div><button onClick={() => { dispatch(editTodo({ text, id })); setmission(''); }}>edit</button></div>
                                    <div><button onClick={() => { dispatch(doneTodo({ done, id })) }}>done</button></div>
                                    <br></br>
                                </li>
                            }
                        </div>
                    )
                })}
            </ol>
        </div>
    )
}

export default ToDo;