import { Subject } from 'types';
import './styles.css';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';

type Props = {
    subject: Subject;
    onDelete: Function;
}

const SubjectCrudCard = ({subject, onDelete} : Props) => {

  const handleDelete = () => {
    
    if(!window.confirm("Are you sure that you want to delete the subject?")){
      return;
    }

    const params : AxiosRequestConfig = {
      method:"DELETE",
      url: `/subjects/${subject.id}`,
      withCredentials: true
    }

    requestBackend(params).then(() => {
      onDelete();
    })
  }

    return(
        <div className='subject-card-container'>
            <div className='subject-card-top-container'>
                <img src={subject?.imgUrl} alt="" />
            </div>
            <div className='subject-card-bottom-container'>
                <h5>{subject?.name}</h5>
                <p>{subject?.team} - {subject?.name}</p>
            </div>
            <div className='subject-crud-card-buttons-container'>
                <button onClick={() => handleDelete()} className='btn btn-outline-danger'>DELETE</button>
                <button className='btn btn-outline-primary'>
                  <Link to={`/admin/subjects/${subject.id}`}>
                    EDIT
                  </Link>
                </button>
            </div>
        </div>
    );
}

export default SubjectCrudCard;