import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import App from './pages/home/App';
import Login from './pages/login/login';
import Adm from './pages/adm/adm';
import Medico from './pages/medico/medico';
import Paciente from './pages/paciente/paciente';
import NotFound from './pages/notFound/notfound';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Administrador
      usuarioAutenticado() && parseJwt().role === "1" ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = 'login' />
    }
  />
);

// const PermissaoComum = ({ component : Component }) => (
//   <Route
//     render = { props =>
//       // Verifica se o usuário está logado e se é Comum
//       usuarioAutenticado() && parseJwt().role === "2" ?
//       // Se sim, renderiza de acordo com a rota solicitada e permitida
//       <Component {...props} /> :
//       // Se não, redireciona para a página de login
//       <Redirect to = 'login' />
//     }
//   />
// );



const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Login" component={Login} />
        <Route path="/Adm" component={Adm} /> 
        <Route path="/Medico" component={Medico} />
        <Route path="/Paciente" component={Paciente} />
        <Route exact path="/NotFound" component={NotFound} />
        <Redirect to = "/NotFound" />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
