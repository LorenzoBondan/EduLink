import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Test } from "types";
import { requestBackend } from "util/requests";
import Modal from 'react-modal';

type Props = {
    test: Test;
    onDeleteOrEdit: Function;
}

const TestCardTest = ({test, onDeleteOrEdit} : Props) => {

    const deleteTest = (testId : number) => {
    
        if(!window.confirm("Are you sure that you want to delete the test?")){
          return;
        }
    
        const params : AxiosRequestConfig = {
          method:"DELETE",
          url: `/tests/${testId}`,
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

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Test>();

    useEffect(() => {

            requestBackend({url:`/tests/${test.id}`, withCredentials:true})
                .then((response) => {
                    const test = response.data as Test;

                    setValue('name', test.name);
                    setValue('date', test.date);
                    setValue('points', test.points);
                    setValue('score', test.score);
                    setValue('studentsId', test.studentsId);
                    setValue('subjectId', test.subjectId);
                })

    }, [test, setValue]);

    const editTest = (formData : Test) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/tests/${test.id}`,
            withCredentials:true,
            data: formData
          }
          requestBackend(params) 
            .then(response => {
                console.log(response.data);
                toast.success("Test edited!");
                closeModal();
                onDeleteOrEdit();
            })
            .catch(() => {
                toast.error('Error');
            })
    }

    return(
        <div className='test-container'>
            <h5>{test.name}</h5>
            <h5>{test.score}</h5>
            <div className='test-container-buttons'>
            <BiEdit onClick={openModal}/>
                    <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                    >
                        <form onSubmit={handleSubmit(editTest)} className="add-note-form">
                            <h1><BiEdit/> Edit Test</h1>
                            <div className="row add-note-inputs-container">
                                <div className='margin-bottom-30'>
                                    <label htmlFor="">Name</label>
                                    <input 
                                        {...register("name", {
                                        required: 'Required field',
                                        })}
                                        type="text"
                                        className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Name"
                                        name="name"
                                    />
                                </div>
                                <div className='margin-bottom-30'>
                                    <label htmlFor="">Score</label>
                                    <input 
                                        {...register("score", {
                                        required: 'Required field',
                                        })}
                                        type="text"
                                        className={`form-control base-input ${errors.score ? 'is-invalid' : ''}`}
                                        placeholder="Score"
                                        name="score"
                                    />
                                </div>
                                <div className='margin-bottom-30'>
                                    <label htmlFor="">Points</label>
                                    <input 
                                        {...register("points", {
                                        required: 'Required field',
                                        })}
                                        type="text"
                                        className={`form-control base-input ${errors.points ? 'is-invalid' : ''}`}
                                        placeholder="Points"
                                        name="points"
                                    />
                                </div>
                            </div>
                            <div className="add-note-buttons-container">
                                <button onClick={closeModal} className="btn btn-outline-danger add-note-button">Close</button>
                                <button className="btn btn-primary text-white add-note-button">Submit</button>
                            </div>
                        </form>
                    </Modal>
                <FaTrashAlt onClick={() => deleteTest(test.id)}/>
            </div>
        </div>
    );
}

export default TestCardTest;