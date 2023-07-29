import { Link } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { User } from 'types';
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import './styles.css';

type Props = {
  user : User;
  onDelete : Function;
}

function UserCrudCard( {user, onDelete} : Props ) {

  const handleDelete = (userId : number) => {
    
    if(!window.confirm("Are you sure that you want to delete the user?")){
      return;
    }

    const params : AxiosRequestConfig = {
      method:"DELETE",
      url: `/users/${userId}`,
      withCredentials: true
    }

    requestBackend(params).then(() => {
      onDelete();
    })
  }

    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td style={{paddingLeft:"0px"}}><Link to={`/admin/users/${user.id}`}><BiEdit/></Link></td>
        <td onClick={() => handleDelete(user.id)} style={{cursor:"pointer", paddingRight:"10px"}}><FaTrashAlt/></td>
      </tr>
    );
  }

  export default UserCrudCard;