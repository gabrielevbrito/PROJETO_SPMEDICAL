import { Link } from 'react-router-dom';

import "../../assets/css/flexbox.css";
import "../../assets/css/reset.css";
import "../../assets/css/style.css";

import logo from "../../assets/img/logo_spmedgroup.png";

import Rodape from '../../components/rodape/rodape';

function App() {
  return (
    <div>

      <header className="cabecalhoPrincipal">
        <div className="container">
          <Link to="/"><img src={logo} alt="logo spmedgroup" /></Link>

          <nav className="cabecalhoPrincipal-nav">
            <Link to="/">Home</Link>
            <Link to="paciente">Consultas</Link>
            <Link to="medico">Medicos</Link>
            <Link to="adm">Adm</Link>
            <Link className="cabecalhoPrincipal-nav-login" to="login" >Login</Link>
            {/* <a className="cabecalhoPrincipal-nav-login" href="login">Login</a> */}
          </nav>
        </div>
      </header>


      <Rodape />
    </div>
  );
}

export default App;
