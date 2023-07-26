import { Note, User } from "types";
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

type Props = {
    note: Note;
}

const NoteCard = ({note} : Props) => {

    const [teacher, setTeacher] = useState<User>();

    const getTeacher = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${note.teacherId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTeacher(response.data);
          })
    }, [note])

    useEffect(() => {
        getTeacher();
    }, [getTeacher]);

    return(
        <div className="note-card-container">
            <div className="note-card-teacher-container">
                <img src={teacher?.imgUrl} alt="" />
            </div>
            <div className="note-card-content-container">

            </div>
            <div className="note-card-moment-container">

            </div>
        </div>
    );
}

export default NoteCard;