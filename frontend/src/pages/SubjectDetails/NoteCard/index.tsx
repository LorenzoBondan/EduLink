import { Note, User } from "types";
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { convertDateTime } from "helpers";
import { FaTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { hasAnyRoles } from "util/auth";

type Props = {
    note: Note;
    userLogged: User;
    onDeleteOrEdit: Function;
}

const NoteCard = ({note, userLogged, onDeleteOrEdit} : Props) => {

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

    const amITheAuthor = () => {
        if(userLogged.id === note.teacherId){
            return true;
        }
        else{
            return false;
        }
    }

    const deleteNote = () => {
    
        if(!window.confirm("Are you sure that you want to delete the note?")){
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/notes/${note.id}`,
          withCredentials: true
        }
    
        requestBackend(params).then(() => {
            onDeleteOrEdit();
        })
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Note>();

    useEffect(() => {
        if(note){
            requestBackend({url:`/notes/${note.id}`, withCredentials:true})
                .then((response) => {
                    const note = response.data as Note;

                    setValue('title', note.title);
                    setValue('text', note.text);
                    setValue('teacherId', note.teacherId);
                    setValue('subjectId', note.subjectId);
                    setValue('moment', note.moment);
                })
            }
    }, [note, setValue]);

    const editNote = (formData : Note) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/notes/${note.id}`,
            withCredentials:true,
            data: formData
          }
          requestBackend(params) 
            .then(response => {
                console.log(response.data);
                toast.success("Note edited!");
                closeModal();
                onDeleteOrEdit();
            })
            .catch(() => {
                toast.error('Error');
            })
    }

    return(
        <div className="note-card-container">
            {(amITheAuthor() || hasAnyRoles(['ROLE_ADMIN'])) &&  
                <div className="note-card-buttons-container">
                    <BiEdit onClick={openModal}/>
                    <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                    >
                        <form onSubmit={handleSubmit(editNote)} className="add-note-form">
                            <h1><BiEdit/> Edit Note</h1>
                            <div className="row add-note-inputs-container">
                                <div className='margin-bottom-30'>
                                    <label htmlFor="">Title</label>
                                    <input 
                                        {...register("title", {
                                        required: 'Required field',
                                        })}
                                        type="text"
                                        className={`form-control base-input ${errors.title ? 'is-invalid' : ''}`}
                                        placeholder="Title"
                                        name="title"
                                    />
                                </div>
                                <div className='margin-bottom-30'>
                                    <label htmlFor="">Text</label>
                                    <textarea 
                                        rows={10}
                                        {...register("text", {
                                        required: 'Required field',
                                        })}
                                        className={`form-control base-input ${errors.text ? 'is-invalid' : ''}`}
                                        placeholder="Text"
                                        name="text"
                                    />
                                </div>
                            </div>
                            <div className="add-note-buttons-container">
                                <button onClick={closeModal} className="btn btn-outline-danger add-note-button">Close</button>
                                <button className="btn btn-primary text-white add-note-button">Submit</button>
                            </div>
                        </form>
                    </Modal>
                    <FaTrashAlt onClick={() => deleteNote()}/>
                </div>  
            }
            <div className="note-card-teacher-container">
                <img src={teacher?.imgUrl} alt="" />
            </div>
            <div className="note-card-content-container">
                <h5><strong>{note.title}</strong></h5>
                <h5>{note.text}</h5>
            </div>
            <div className="note-card-moment-container">
                <p><strong>Published in:</strong></p>
                <span>{convertDateTime(note.moment)}</span>
            </div>
        </div>
    );
}

export default NoteCard;