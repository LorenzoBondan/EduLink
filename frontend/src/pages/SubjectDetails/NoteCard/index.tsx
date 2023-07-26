import { Note, User } from "types";
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { convertDateTime } from "helpers";

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
                <h5><strong>{note.title}</strong></h5>
                <h5>{note.text}</h5>
            </div>
            <div className="note-card-moment-container">
                <h6>Published in:</h6>
                <p>{convertDateTime(note.moment)}</p>
            </div>
        </div>
    );
}

export default NoteCard;