import { NavLink } from 'react-router-dom';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import { TbClipboardData } from 'react-icons/tb';
import { HiLogout } from 'react-icons/hi';
import { HiLogin } from 'react-icons/hi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { User } from 'types';
import { getTokenData, hasAnyRoles, isAuthenticated } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import './styles.css';
import Notifications from 'components/Notifications';
import logo from 'assets/images/logo.png';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'util/storage';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import history from 'util/history';

const TopNavbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      if(isAuthenticated()){
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData()
        })
      }
      else{
        setAuthContextData({
          authenticated: false,
        })
      }
    }, [setAuthContextData]);

    const getUser = useCallback(async () => {
      try {
        const email = getTokenData()?.user_name;
  
        if (email) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setUser(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, []);

    useEffect(() => {
      if (authContextData.authenticated) {
        getUser();
      }
    }, [authContextData.authenticated, getUser]);

    const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); 
      
      removeAuthData(); 
  
      setAuthContextData({
        authenticated: false,
      })
  
      history.replace('/'); 
    }

    const [showNotifications, setShowNotifications] = useState(false);
    
    const openAndCloseNotifications = () => {
        if(showNotifications){
          setShowNotifications(false);
        }
        else{
          setShowNotifications(true);
        }
    }

    return(
        <div className='top-navbar-main-container'>
          <div className='main-container-navbar'>
              <div className='top-navbar-brand'>
                <img src={logo} alt="" />
                <h4>EDULINK</h4>
              </div>
              {authContextData.authenticated ?
              <>
              <div className='second-container-navbar'>
                  <ReactTooltip id="top-navbar-tooltip" place="bottom" />
                  <NavLink to="/profile" className='top-navbar-profile-container'>
                      <h1>{user?.name}</h1>
                      {user?.roles.map(role => (
                        <p className='user-role-badge' key={role.id}>{role.authority.substring(5)}</p>
                      ))}
                  </NavLink>
                  <div className='top-navbar-buttons-container'>
                    { hasAnyRoles(['ROLE_ADMIN']) && ( 
                      <NavLink to="/admin" className="admin-nav-item">
                          <p data-tooltip-content="Admin" data-tooltip-id="top-navbar-tooltip"><MdOutlineAdminPanelSettings className='top-navbar-icon'/></p>
                      </NavLink>
                    )}
                    <p onClick={() => openAndCloseNotifications()} data-tooltip-content="Notifications" data-tooltip-id="top-navbar-tooltip">
                      <IoIosNotificationsOutline className='top-navbar-icon' />
                      {user && user?.notifications.filter(notification => !notification.read).length > 0 && <span className='notification-badge'>{user?.notifications.filter(notification => !notification.read).length}</span>}
                    </p>
                    { hasAnyRoles(['ROLE_PARENT', 'ROLE_TEACHER', 'ROLE_ADMIN']) && ( 
                    <NavLink to="/messages">
                        <p data-tooltip-content="Messages" data-tooltip-id="top-navbar-tooltip"><HiOutlineChatBubbleOvalLeft className='top-navbar-icon'/></p>
                    </NavLink>
                    )}
                    <NavLink to="/subjects">
                        <p data-tooltip-content="Subjects" data-tooltip-id="top-navbar-tooltip"><TbClipboardData className='top-navbar-icon'/></p>
                    </NavLink>
                    <NavLink to="/" className="login-nav-item" onClick={handleLogoutClick}>
                      <p data-tooltip-content="Logout" data-tooltip-id="top-navbar-tooltip"><HiLogout className='top-navbar-icon'/></p>
                    </NavLink>
                  </div>
              </div>
              </> : (
                <div className='top-navbar-login-container'>
                    <NavLink to="/auth/login" className="login-nav-item">
                      <p><HiLogin/> Sign In</p>
                    </NavLink>
                </div>
              )}
          </div>
          {showNotifications && 
            <div className='top-navbar-notifications-container'>
              {user && <Notifications onReadNotification={getUser}/>}
            </div>
          }
        </div>
    );
}

export default TopNavbar;