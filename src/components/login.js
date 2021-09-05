import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from "axios";
import { login } from '../features/userSlice';
import './login.css';
import { Alert, CloseButton } from 'react-bootstrap';
const Login = () => {

    //компонент, отвечающий за авторизацию. Единственное- так и не смог пофиксить проблему с неприходящими хедерами. При разработке пользовался обходными путями
    //(делал запрос на авторизацию через postman, после чего брал оттуда токены доступа и помещал их в accessToken, client и uid в dispatch())

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [showAlert, setshowAlert] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory();

    const apiPost = axios.create({
        baseURL: 'http://lzone.isfb.ru/api/v2',
        timeout: 3000,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        apiPost.post('/auth/sign_in', {email: email, password: password}).then(response => {
            console.log(response.headers)
           dispatch(login({
                accessToken:response.headers['access-token'],
                client: response.headers['client'],
                uid: response.headers['uid']  
            }))
            history.push('/news')
        }).catch(error => {
            console.log(error)
            setshowAlert(true)
        })
    }

    return (
        <div className="login">
            <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <h1>Please log in</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="loginButton">Submit</button>
            </form>
            <Alert show={showAlert} style={{marginTop: '10px'}} variant= 'danger'>
                <Alert.Heading>Error</Alert.Heading>
                <p>The account does not exist, try again</p>
                <hr />
                <div className="d-flex justify-content-end">
                <CloseButton onClick={() => setshowAlert(false)}>
                </CloseButton>
                </div>
            </Alert>
        </div>
    )
}

export default Login
