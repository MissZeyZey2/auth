import React , {useState} from "react";
import { FaUser }  from "react-icons/fa" ;
import axios from "axios";
import './forget.css';
import { useSearchParams,useNavigate} from 'react-router-dom';

export const Forgot = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const client_id = searchParams.get('client_id'); 
    const redirect_uri = searchParams.get('redirect_uri');
    const code_challenge = searchParams.get('code_challenge');
    const code_challenge_methode = searchParams.get('code_challenge');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const name = userName
    
        try {
            const response = await axios.get(`https://localhost:3003/user/name/${name}`);
            if (response.status === 200) {
                const response2 = await axios.put(`https://localhost:3000/restartCode/${name}/user`);
                if(response2.status === 200)
                    navigate(`/verifcode?forgot=true&id=${response.data.data.id}&userName=${response.data.data.userName}&client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`);
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
                        <input type="text" placeholder='Username'onChange={(e) => setUserName(e.target.value)} required />
                        <FaUser className="icon"/>
                    </div>
                   
                    <button type='submit'>Submit</button>
                    
                </form>
            </div>
        </div>
    )
}
