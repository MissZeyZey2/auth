import './header.css';
import logo from './logo.jpeg'

export const Header = ()=>{
   return( 
    <>
        <header class="tete"> <h1 >StreamCamer</h1></header>
        <img src={logo} alt="STREAMCAMER Logo" class="logo"></img>
    </>
    )
}
