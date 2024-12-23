import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser,FaLock, FaEnvelope }  from "react-icons/fa" ;
import axios from 'axios';
import { useSearchParams,useNavigate} from 'react-router-dom';


function loginUser(data){
    return new Promise(async (resolve, reject) => {
        try {
            await axios.post('https://localhost:3000/code', data);
            resolve();
        } catch (error) {
            reject(error);
        }        
    })
}

const LoginRegister = () => {
    const state = '4';
    const response_type = 'code'

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [action, setAction] = useState('');

    const [searchParams] = useSearchParams();

    const client_id = searchParams.get('client_id'); 
    const redirect_uri = searchParams.get('redirect_uri');
    const code_challenge = searchParams.get('code_challenge');
    const code_challenge_methode = searchParams.get('code_challenge');

    
    const navigate_forgot = (e)=>{
        navigate(`/forgot?client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const loginData = { addressMail:email, password,userName};
    
        try {
            const response = await axios.post('https://localhost:3000/sign/user', loginData);
            if (response.status === 201) {
                navigate(`/verifcode?id=${response.data.data.id}&userName=${response.data.data.userName}&client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`);
            }
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const handleLogin = async (e)=>{
        e.preventDefault();

        const data = {
            state,response_type,redirect_uri,client_id,code_challenge,code_challenge_methode,
            username:userName,password
        }

        try {
            await loginUser(data);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Échec de la connexion');
        }
    }

    const registerLink = () => {
        setAction(' active');
    }
    
    const loginLink = () => {
        setAction('');
    }
    
    return(
        
        <div className={`wrapper${action}`}>
            <div className="form-box login"> 
                <form action="" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username'onChange={(e) => setUserName(e.target.value)} required />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password'onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label> <input type="Checkbox" />Remember me</label>
                        <a onClick={navigate_forgot }>Forgot password?</a>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit'>Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>

            </div>
            <div className="form-box register"> 
                <form action=""  onSubmit={handleSubmit} >
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} required />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        <FaEnvelope className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label> <input type="Checkbox" />I agree to the terms & conditions</label>
                        
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit'>Register</button>
                    <div className="register-link">
                        <p>Already have an account ? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default LoginRegister