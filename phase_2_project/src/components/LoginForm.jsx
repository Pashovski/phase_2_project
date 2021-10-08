import { Form, Message } from "semantic-ui-react";
import { useState } from "react";

function LoginForm({Login, errorMessage}){
    const [details, setDetails] = useState({
        "name": "",
        "email": "",
        "password": ""
    })

    const submitHandler = e => {
        e.preventDefault();
        console.log(details)
        Login(details);
    }
    return (
        <Form onSubmit={submitHandler}>
        <h2>Login</h2>
            <Form.Group>
                    {errorMessage ?
                    <Message
                    error
                    header='Check login info'
                    content='Some of your login credentials are not matching up, please try again.'
                    /> : null}
                    <Form.Input 
                    label='Name'  
                    name='name' 
                    type='text' 
                    id='name' 
                    value={details.name}
                    onChange={e => setDetails({...details, name: e.target.value})} 
                    />
                    <Form.Input 
                    label='Email' 
                    name='email' 
                    type='email' 
                    id='email' 
                    onChange={e => setDetails({...details, email: e.target.value})} 
                    value={details.email}/>
                    <Form.Input 
                    label='Password' 
                    name='password' 
                    type='password' 
                    id='password' 
                    onChange={e => setDetails({...details, password: e.target.value})} 
                    value={details.password}/>
                <input type="submit" value="LOGIN"/>
            </Form.Group>
        </Form>
    )
}

export default LoginForm;