import { Subject } from 'types';
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2';

type Props = {
    subject: Subject;
    onDelete: Function;
}

const SubjectCrudCard = ({subject, onDelete} : Props) => {

  const handleDelete = (userId : number) => {
    
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
            <div className='subject-card-buttons-container'>
                <div className='subject-card-button'>
                    <FaUsers/>
                    <p>{subject?.students.length}</p>
                </div>
                <div className='subject-card-button'>
                    <HiOutlineDocumentText/>
                    <p>{subject?.tests.length}</p>
                </div>
                <div className='subject-card-button'>
                    <HiOutlineEnvelope/>
                    <p>{subject?.notes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default SubjectCrudCard;