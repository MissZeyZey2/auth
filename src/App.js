
import LoginRegister from './Components/LoginRegister/LoginRegister';
import { Confirmation } from './Components/confirmation/confirmation';
import { Forgot } from './Components/forgotpassword/forgot';
import {Header} from './Components/header/Header';
import {Change} from './Components/changepass/changepass';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<><Header/> <LoginRegister /></>} />
          <Route path="/verifcode" element={<Confirmation />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change" element={<Change />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
