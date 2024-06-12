import React, { useState } from 'react'
import './hwTodo.css'

const Todo2 = () => {
    // [변수명, 수정하는 함수명] 이렇게 둘을 세트로 생성하며, useState의 매개변수에는 기본 값을 전달
    const [todoList, setTodoList] = useState([])
    const [todo, setTodo] = useState('')

    // input의 내용이 변경될 때 todo의 값도 업데이트 해줌
    const todoHandleChange = (event) => setTodo(event.target.value)

    const add = () => {
        if (todo == '') {
            window.alert('내용을 입력해주세요.')
            return
        }
        todoList.push(todo)
        setTodo('')
        // todoHandleChange({ target: { value: '' } })
    }

    const del = (idx) => {
        const updatedTodos = todoList.filter((_, i) => i !== idx)
        setTodoList(updatedTodos)
    }

    return (
        // class 지정을 className으로 함
        <div className="todoWrap">
            <div className="container">
                <div>
                    <h2>hw's To do list</h2>
                </div>

                <div>
                    {/* defaultValue와 onChange는 세트라고 생각하는게 편함 */}
                    <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                    <button onClick={add}>추가</button>
                </div>

                <div>
                    {todoList.map((todo, i) => (
                        <div key={i}>
                            {todo}
                            <button onClick={() => del(i)}>삭제</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Todo2

// react document : https://ko.legacy.reactjs.org/docs/hello-world.html
// to do list 만들기 : https://www.geeksforgeeks.org/create-todo-app-using-reactjs/?ref=lbp
