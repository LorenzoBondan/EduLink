import Footer from "components/Footer";
import TopNavbar from "components/TopNavbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import history from "util/history";
import background from 'assets/images/background.jpg';
import Subjects from "pages/Subjects";
import SubjectDetails from "pages/SubjectDetails";
import Messages from "pages/Messages";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row" style={{backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
                <TopNavbar/>

                <Switch>
                    {isAuthenticated() ? (
                        <Redirect from='/' to='/subjects' exact />
                    ) : (
                        <Redirect from='/' to='/auth/login' exact />
                    )}

                    <Redirect from='/auth' to='/auth/login' exact />
                    <Route path="/auth">
                        <Auth/>
                    </Route>

                    <Redirect from="/admin" to="/admin/users" exact />
                    <Route path="/admin">
                        <Admin/>
                    </Route>

                    {isAuthenticated() && (
                        <Switch>
                            <Route path="/subjects" exact>
                                <Subjects/>
                            </Route>

                            <Route path="/subjects/:subjectId" exact>
                                <SubjectDetails/>
                            </Route>

                            <Route path="/messages/:receiverUserId" exact>
                                <Messages/>
                            </Route>

                        </Switch>
                    )}
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
}

export default Routes;