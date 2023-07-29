import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import './styles.css';

const LeftNavbar = () => {
    return(
        <nav className='admin-nav-container'>
            { hasAnyRoles(['ROLE_ADMIN']) && ( 
                <ul className='ul-container'>
                    <li>
                        <NavLink to="/admin/subjects" className='admin-left-nav-item'>
                            <p>Subjects</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className='admin-left-nav-item'>
                            <p>Users</p>
                        </NavLink>
                    </li>   
                </ul>
            )}
        </nav>
    );
}

export default LeftNavbar;