import React , {useState} from "react";
import { FaUser, FaLock }  from "react-icons/fa" ;
import axios from "axios";
import './changepass.css';
import { useSearchParams,useNavigate} from 'react-router-dom';

export const Change = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const client_id = searchParams.get('client_id'); 
    const id = searchParams.get('id'); 
    const redirect_uri = searchParams.get('redirect_uri');
    const code_challenge = searchParams.get('code_challenge');
    const code_challenge_methode = searchParams.get('code_challenge');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const codeverif = localStorage.getItem('codeverif');

        const data = {codeverif , password}
    
        try {
            const response = await axios.put(`https://localhost:3003/user/update/forget/${id}`,data);
            if (response.status === 200) {
                navigate(`/?client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`)
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('user not found ');
        }
    };
    
    return(
        <div className="wrapper">
            <div className="form-box login"> 
                <form action="#" onClick={handleSubmit}>
                    <h1>Update Password</h1>
                    <div className="input-box">
                        <input type="password" placeholder='New Password'onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className="icon"/>
                    </div>
                   
                    <button type='submit'>Update</button>
                    
                </form>
            </div>
        </div>
    )
}
