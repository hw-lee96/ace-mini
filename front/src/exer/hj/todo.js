import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

const Todo1 = () => {

    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState([]);

    const updateInput = (value) => {
        setUserInput(value)
    }

    // Add item if user input in not empty 
    const addItem = () => {
        if (userInput !== "") {
            const Todo = {
                // Add a random id which is used to delete 
                id: Math.random(),

                // Add a user value to list 
                value: userInput,
            };

            // Update list 
            setList([...list, Todo]);
            setUserInput("");
        }
    }

    // Function to delete item from list use id to delete 
    const deleteItem = (key) => {
        // Filter values and leave value which we need to delete 
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state 
        setList(updateList)
    }

    const editItem = (index) => {
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodos = [...list]
            updatedTodos[index].value = editedTodo
            setList(updatedTodos)
        }
    }
    return (
        <Container>
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "3rem",
                    fontWeight: "bolder",
                }}
            >
                TODO LIST
            </Row>

            <hr />
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="add item . . . "
                            size="lg"
                            value={userInput}
                            onChange={(e) => updateInput(e.target.value)}
                            aria-label="add something"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup>
                            <Button
                                variant="dark"
                                className="mt-2"
                                onClick={addItem}
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <ListGroup>
                        {list.map((item, index) => (
                            <div key={index}>
                                <ListGroup.Item
                                    variant="dark"
                                    action
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {item.value}
                                    <span>
                                        <Button
                                            style={{ marginRight: "10px" }}
                                            variant="light"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="light"
                                            onClick={() => editItem(index)}
                                        >
                                            Edit
                                        </Button>
                                    </span>
                                </ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Todo1