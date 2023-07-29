import { Link, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import './styles.css';
import { hasAnyRoles, isAuthenticated } from "util/auth";
import { MdDangerous } from 'react-icons/md';
import Users from "./User";
import LeftNavbar from "./LeftNavbar";
import Subjects from "./Subjects";


function Admin(){
    return(
        <div className="admin-container" style={{display:"flex", justifyContent:"flex-start"}}>
        {hasAnyRoles(["ROLE_ADMIN"])?  (
            <>
            <LeftNavbar/>
            <Switch>
                <PrivateRoute path="/admin/subjects">
                    <Subjects/>
                </PrivateRoute>
                <PrivateRoute path="/admin/users">
                    <Users/>
                </PrivateRoute>
            </Switch>
            </>
            ) : (
                <div className='base-card access-main-container'>
                    <div className="access-text-container" style={{textAlign:"center"}}>
                        <h1 className="text-primary">
                            <i><MdDangerous/></i>
                            Access denied!
                        </h1>
                        {isAuthenticated() ? 
                            <p className="text-secondary">Ask for an Admin to give you permission</p> 
                            : 
                            <Link to="/auth/login">
                                <p className="text-secondary">Sign in to have access to this page</p>
                            </Link>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;