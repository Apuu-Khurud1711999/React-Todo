import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from '@material-ui/core/Checkbox';


export class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { credData: [] ,flag:0,userName:''};
        this.handleOnChange=this.handleOnChange.bind(this)
    }
    
    handleOnChange(value) {
        console.log("Captcha value:", value);
      } 

    handler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    componentDidMount = async () => {
        try {
            const URL = "  http://localhost:3001/Data";
            const res = await fetch(URL);
            const resData = await res.json();
            console.log(resData);
            this.setState({ credData: resData });
            console.log(this.stata.credData.length)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    submit = () => {
        let credData = this.state.credData;
        console.log(Object.keys(credData).length);
        let i = 0;
        while (i <= Object.keys(credData).length) {
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == '') {
                alert("Please fill the fields");
                break;
            }

            if ((document.getElementById("email").value == credData[i].email) && (document.getElementById("pass").value == credData[i].pass)) {
                console.log("done");
                console.log(credData[i].name)
                let credArr = {
                    id:i+1,
                    email: document.getElementById("email").value,
                    pass: document.getElementById("pass").value,
                    fName: credData[i].fName,
                    lName: credData[i].lName,
                    uName: credData[i].uName,
                    email: credData[i].email,
                    tasks: credData[i].tasks, 
                    cPass:document.getElementById("pass").value
                   
                }
                   
                localStorage.setItem('credArr', JSON.stringify(credArr));
                this.setState({flag:1});
                console.log(this.state.userName)
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
        const paperStyle={padding :20,height:'80vh',width:350, margin:"20px auto"}
        const avatarStyle={backgroundColor:'#1bbd7e'}
        const btnstyle={margin:'8px 0'}
        return (
            <>
                <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Login here</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username'  id="email" onChange={this.handler} fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' id="pass" onChange={this.handler} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                  {
                    this.state.flag==1 && <Redirect to="/dash"/>
                  }
                
                <ReCAPTCHA
                   sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                   onChange={this.handleOnChange}
                />,

                <Button type='submit' color='primary' onClick={this.submit} variant="contained" style={btnstyle} fullWidth>Submit</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="./Register" >
                        Register 
                </Link>
                </Typography>
            </Paper>
        </Grid>
            </>
        )
    }
}


export default Login

