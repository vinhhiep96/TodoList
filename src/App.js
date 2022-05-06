import TodoList from "./components/TodoList";
import Textfiels from "@atlaskit/textfield"
import Button from "@atlaskit/button"
import { useState } from "react";
import {v4} from "uuid"
import { useCallback } from "react";
import { useEffect } from "react";

const TODO_APP_STORGAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState([""]);

useEffect(()=>{
  const storagedTodoList = localStorage.getItem(TODO_APP_STORGAGE_KEY);
  if(storagedTodoList){
    setTodoList(JSON.parse(storagedTodoList));
  }
},[]);

  useEffect(()=>{
    localStorage.setItem(TODO_APP_STORGAGE_KEY, JSON.stringify(todoList))
  }, [todoList]);

  const onTextInput = useCallback((e) => {
    setTextInput(e.target.value)
  },[]);
  const onAddBtnChange = useCallback((e) =>{
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false},
      ...todoList,
    ]);

    setTextInput("");
    },
    [textInput, todoList]
  );
  const onCheckBtnClick = useCallback((id) =>{
    setTodoList((prevState)=>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo)
    )
  })
  return (
    <>
      <h3>Viec can lam</h3>
      <Textfiels 
        name="add-todo" placeholder="Nhap to do list.." elemAfterInput={
          <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnChange}>
            Them
          </Button>}
        css={{padding: "2px 4px 2px"}}
        value = {textInput}
        onChange = {onTextInput}
      ></Textfiels>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/> 
    </>
  );
}

export default App;
