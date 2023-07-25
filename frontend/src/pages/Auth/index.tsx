import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import logo from 'assets/images/logo.png';
import './styles.css';

function Auth(){
    return(
        <div className="auth-container">
            <div className='auth-form-container'>
                <div className="auth-form-info">
                    <img src={logo} alt="" />
                    <h1>Welcome to <strong>EduLink</strong></h1>
                    <p className="separator"></p>
                    <p>EduLink is an innovative communication platform that connects schools, parents, and teachers in a collaborative and efficient environment. With EduLink, parents and teachers can communicate directly and easily, exchanging messages, sharing updates on students' academic performance, as well as information about school events and activities.</p>
                </div>
                <Switch>
                    <Route path="/auth/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Auth;