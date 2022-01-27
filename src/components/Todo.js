import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReactHtmlParser from 'react-html-parser';
import Navs from './Navs';
import Footer from './Footer';
import axios from 'axios';

export default function Todo() {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);

    let list=JSON.parse(localStorage.getItem("credArr"));
    const [data, setData] = useState(list.tasks)

    console.log(list)
    console.log(list.tasks)

    
    const add = () => {
        let formData = { title: fNameInput.current.value, priority: lNameInput.current.value, }
        if (document.getElementById("title").value == '' || document.getElementById("pri").value == ' ') {
            alert("Please fill out fields");
        }
        else {
            console.log(data)
            setData([ ...data,formData]);
           
              list.tasks=[ ...data,formData];
               
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Data/${list.id}`,list)
            document.getElementById("title").value = " ";
            document.getElementById("pri").value = " ";

        }
    }
    const deletes = (index) => {
        console.log("delete");
        var bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            data.splice(index, 1)
            setData([ ...data]);
            list.tasks=[...data]
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Data/${list.id}`,list)

        }
    }
    const strike = (index) => {
        data[index].title = `<strike>${data[index].title}</strike>`;
        setData([ ...data]);
        localStorage.setItem('credArr', JSON.stringify(list));
        axios.put(`http://localhost:3001/Data/${list.id}`,list)
    }


    return (
        <div>
            <Navs />
            <h1 className="text-center">Welcome to Our To Do list</h1>
            <Container className="text-center">
                <Form>
                    <h3>Add new ToDo</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Add New ToDo" ref={fNameInput} id="title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="number" minlength="1" maxlength="5" placeholder="Enter Priority (1-5)" ref={lNameInput} id="pri" />
                    </Form.Group>

                    <Button className="mx-1" variant="contained" onClick={add}>Submit</Button>

                </Form>
            </Container>
            <Container className="my-2">
                <table className="table" border="3">
        <thead>
            <th  style={{ width: "50%" }} >Title</th>
            <th>Action</th>
            <th>Priority</th>
            </thead>
                    <tbody>

                        {data!=undefined && data.map((task, index) => {
                            return <tr key={index}>
                                <td id="line" >{ReactHtmlParser(task.title)}</td>
                                <td><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} className="border p-1 mx-1" color="primary" onClick={() => strike(index)} /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                    onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>
                                <td style={{ color: "blue" }}>{task.priority}</td>
                            </tr>

                        })}
                    </tbody>

                </table>
            </Container>
            <Footer />


        </div>
    )
}