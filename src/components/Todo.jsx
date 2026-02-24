import React from "react";

function Todo(){
    let [inputValue, setInputValue] = React.useState("");
    let [editTodo, seteditTodo] = React.useState({});
    let [todoList, settodoList] = React.useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);


    const handleChange = (event) =>{
        setInputValue(event.target.value);
    };

    const addTodo = (event)=>{
        event.preventDefault();
        if(inputValue){
            let todos = todoList;
            todos.push({
                    id : Date.now(),
                    value : inputValue,
                    isDone : false
                });

            setInputValue("");
            settodoList(todos);
            localStorage.setItem("todos",JSON.stringify(todos));
        }else{
            alert("Please enter some text in input field.");
        }
    };

    const deleteTodo = (deletingItem)=>{
        let todos = todoList;
        todos = todos.filter((todo)=>{
            if(todo !== deletingItem){
                return todo;
            }
        })
        settodoList(todos);
        localStorage.setItem("todos",JSON.stringify(todos));
    };

    const handleCheck =(item)=>{
        let todos = todoList;
        todos = todos.map((todo)=>{
            if(todo===item){
                todo.isDone = !todo.isDone;
            }
            return todo;
        })
        settodoList(todos);
        localStorage.setItem("todos",JSON.stringify(todos));

    };

    const editTodoClick = (todo)=>{
        seteditTodo(todo);
    };

    const editTodoSubmit = (editTodo)=>{
        if(editTodo.value){
            let todos = [...todoList];
            todos = todos.map((todo)=>{
                if(todo.id === editTodo.id){
                todo.value = editTodo.value;
                }
                return todo;
            })
            settodoList(todos);
            localStorage.setItem("todos",JSON.stringify(todos))
        }else{
            alert("Please enter some text in input field.");
        }
    }

    
    return(
        <>
            <form onSubmit={addTodo}>
                <div className="input-group mb-4">
                    <input type="text" className="form-control me-2" placeholder='Add todo' onChange={handleChange} value={inputValue}/>

                    <button className="btn btn-success" type="submit">Add Todo</button>
                </div>
            </form>

            <hr className="mb-0"/>
            <table className="table">
                <tbody>
                    {todoList.map((todo,index)=>
                        <tr key={todo.id}>
                            <td>{index+1}</td>
                            <td>
                                <input type="checkbox" defaultChecked={todo.isDone} onClick={()=>handleCheck(todo)}/>
                            </td>
                            <td className="col-8">{todo.value}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#exampleModal" type="button"
                                onClick={()=>editTodoClick(todo)}> Edit </button>
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={()=>deleteTodo(todo)}> Delete </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Update Todo Value
                            </h5>
                            <button 
                                type="button"
                                className="btn-close"
                                data-bs-dismiss='modal'
                                aria-label="close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e=>{
                                e.preventDefault();
                                editTodoSubmit(editTodo);
                                }}>
                                <div className="mb-3">
                                    <label
                                        className="d-flex"  
                                        htmlFor="recipient-name">
                                            Value:
                                    </label>

                                    <input
                                        id="recipient-name" 
                                        type="text" 
                                        className="form-control"
                                        value={editTodo.value}
                                        onChange={e=>seteditTodo(
                                            {...editTodo,value : e.target.value,}
                                        )}
                                    />
                                    
                                </div>
                                <div className="model-footer d-flex justify-content-end ">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss = "modal">
                                        Close
                                    </button>

                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo;