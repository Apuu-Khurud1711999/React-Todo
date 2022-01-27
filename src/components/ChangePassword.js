import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Alert } from '@mui/material';
import Navs from './Navs';
import Footer from './Footer'
import axios from 'axios';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { credData: [] ,id:0,isChanged:0}
    }
    componentDidMount = async () => {
        try {
            const URL = "http://localhost:3001/Data";
            const res = await fetch(URL);
            const resData = await res.json();
            console.log(resData);
            this.setState({ credData: resData });
        }
        catch (err) {
            console.log(err)
        }
    }

    handler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    submit = () => {
        let credData = this.state.credData;
        let i = 0;
        while (i <= Object.keys(credData).length) {
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == ''|| document.getElementById("Npass").value == ''|| document.getElementById("Cpass").value == '') {
                alert("Please fill the fields");
                break;
            }
            else if(document.getElementById("Npass").value!=document.getElementById("Cpass").value){
                alert("Your Password Does not match");
                break;
            }
            else if ((document.getElementById("email").value == credData[i].email) && (document.getElementById("pass").value == credData[i].password)) {
                console.log("done");
                let nPass = document.getElementById("Npass").value;
               this.state.id=i;
                let credArr = {
                    id:this.state.id,
                    email: document.getElementById("email").value,
                    password: nPass,
                    Name: credData[i].Name
                }
                axios.put(`http://localhost:3001/Data/${this.state.id}`, credArr)

                console.log(this.state.credData)
                this.state.isChanged=1;
                localStorage.setItem('credArr', JSON.stringify(credArr));
                alert("change  Succcessfully");
                this.setState({ flag: 1 });
                document.getElementById("email").value = ''
                document.getElementById("pass").value = '';

                break;
            }
            
            else {
                console.log("no")
                i++;
                if (i == Object.keys(credData).length) {
                    alert("Your Credientials Does not match please enter correct details");
                    break;
                }
            }
        }
    }
    render() {
        return (
            <>
                <Navs />
                <h1 className="my-4">Change Your Password here</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" name="email" id="email" label="Enter Your Email" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="email" id="pass" label="Enter Your Current Password" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="pass" id="Npass" label="Enter Your New Password" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="pass" id="Cpass" label="Confirm Password" onChange={this.handler} variant="outlined" />

                </Box>
                <Button className="mb-5" onClick={this.submit} variant="contained">Submit</Button>
                {this.state.isChanged==1 &&  <Redirect to="/"/>}
                <Footer />
            </>

        )
    }
}

export default ChangePassword
