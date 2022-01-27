import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Form} from 'react-bootstrap';
import axios from 'axios'

export default function Register () {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const uNameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    const [data, setData] = useState({
        credData: [],
        isLoggedIn: 0
    })

    const register = () => {

        if (document.getElementById("fName").value == '' || document.getElementById("lName").value == '' || document.getElementById("uName").value == '' || document.getElementById("email").value == '' || document.getElementById("pass").value == '' || document.getElementById("cPass").value == '') {
            alert("Please fill all fields")
        }
         
         else  {  let formData = { fName: fNameInput.current.value, lName: lNameInput.current.value, uName: uNameInput.current.value, email: emailInput.current.value, pass: passInput.current.value, cPass: cPassInput.current.value, tasks: [] };
            console.log(formData)
            setData(data => ({
                // ...data,
                credData: [...data.credData, formData],
            }));
            axios.post(`http://localhost:3001/Data`, formData);
            //500 400 404 
            // {
            //     status, data
            // }
            alert("registered successfully")

        }
        
    }
    const login = () => {
        setData({ isLoggedIn: 1 })
    }
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return (
        <>
             <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register here</h2>
                </Grid>
                {/* <TextField label='FirstName' placeholder='Enter first name' id="fName" ref={fNameInput} fullWidth required/>
                <TextField label='LastName' placeholder='Enter last name' id="lName" ref={lNameInput} fullWidth required/>
                <TextField label='UserName' placeholder='Enter Username' id="uName" ref={uNameInput} fullWidth required/>
                <TextField label='Email' placeholder='Enter Email-Id' id="email" ref={emailInput} fullWidth required/>
                <TextField label='Password' placeholder='Enter Password'id="pass" type='password' ref={passInput} fullWidth required/>
                <TextField label='ConfirmPassword' placeholder='Confirm password' id="cPass" type='password' id="pass" ref={cPassInput} fullWidth required/>
    
                <Button type='submit' color='primary' onClick={register} variant="contained" style={btnstyle} fullWidth>Register</Button>
                <Button type='submit' color='primary' onClick={login} variant="contained" style={btnstyle} fullWidth>Login</Button> */}
                 <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter first name" ref={fNameInput} id="fName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="Enter Last name" ref={lNameInput} id="lName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="email" placeholder="Enter Username" ref={uNameInput} id="uName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="text" placeholder="Enter Email" ref={emailInput} id="email"  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="password" placeholder="Enter Password" ref={passInput} id="pass" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="password" placeholder="Confirm Password" ref={cPassInput} id="cPass" />
                </Form.Group>
                <Button className="mx-1" variant="contained" onClick={register} >Register</Button>
            <Button className="mx-1" variant="contained" onClick={login}>Login</Button>
                
            </Form>
                
            </Paper>
        </Grid>
        {data.isLoggedIn == 1 && <Redirect to="/" />}

        </>
    )
}

