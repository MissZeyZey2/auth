import React , {useState} from "react";
import axios from "axios";
import './confirmation.css';
import { useSearchParams,useNavigate} from 'react-router-dom';

export const Confirmation = () => {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const userName = searchParams.get('userName');
    const client_id = searchParams.get('client_id'); 
    const redirect_uri = searchParams.get('redirect_uri');
    const code_challenge = searchParams.get('code_challenge');
    const code_challenge_methode = searchParams.get('code_challenge');
    const test = searchParams.get('forgot');
    
    const [codeverif, setCodeverif] = useState(''); 
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const submitData = { codeverif };
    
        try {
            const response = await axios.post(`https://localhost:3000/verifCode/${id}`, submitData);
            if (response.status === 201) {
                navigate(`/?client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`)
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Échec de la connexion');
        }
    };


    const handleVerif = async (e) => {
        e.preventDefault();
    
        const submitData = { codeverif };
    
        try {
            const response = await axios.post(`https://localhost:3003/user/verifCode/${id}`, submitData);
            if (response.status === 200) {
                localStorage.setItem('codeverif',codeverif)
                navigate(`/change?id=${id}&client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_methode}`)
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Échec de la connexion');
        }
    };

    const handleForget = async (e) => {
        try {
            const response = await axios.put(`https://localhost:3000/restartCode/${userName}/userTemp`);
            if (response.status === 200) {
                setMsg('code bien envoyé,resaisir')
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Veuillez réessayer plus tard');
        }
    };

    return(
        <div className="wrapper">
            <div className="form-box login"> 
                <form action="" onSubmit={test?handleVerif:handleSubmit} >
                    <h1>Confirmation</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Verification Code' onChange={(e)=>setCodeverif(e.target.value)} maxLength={6} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {msg && <p style={{ color: 'blue' }}>{error}</p>}
                    <button type='submit'>Submit</button>
                    <button onClick={handleForget}> pas recu </button>
                </form>
            </div>
        </div>
    )
}
