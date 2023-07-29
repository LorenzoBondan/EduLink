import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import { Subject, User } from 'types';
import { toast } from 'react-toastify';

type UrlParams = {
    subjectId: string;
}

const Form = () => {

    const {subjectId} = useParams<UrlParams>();

    const isEditing = subjectId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<Subject>();

    useEffect(() => {
        if(isEditing){
            requestBackend({url:`/subjects/${subjectId}`, withCredentials:true})
                .then((response) => {
                    const subject = response.data as Subject;

                    setValue('name', subject.name);
                    setValue('imgUrl', subject.imgUrl);
                    setValue('notes', subject.notes);
                    setValue('students', subject.students);
                    setValue('teacherId', subject.teacherId);
                    setValue('team', subject.team);
                    setValue('tests', subject.tests);
                })
        }
        
    }, [isEditing, subjectId, setValue]);

    const history = useHistory();

    const [selectStudents, setSelectStudents] = useState<User[]>();

    useEffect(() => {
        requestBackend({url: '/users/students', withCredentials: true})
            .then(response => {
                setSelectStudents(response.data.content);
        })
    }, []);

    const [selectTeacher, setSelectTeacher] = useState<User[]>();

    useEffect(() => {
        requestBackend({url: '/users/teachers', withCredentials: true})
            .then(response => {
                setSelectTeacher(response.data.content);
        })
    }, []);

    const onSubmit = (formData : Subject) => {

        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url : isEditing? `/subjects/${subjectId}` : "/subjects",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                toast.success("Success!");
                history.push("/admin/subjects");
            })
            .catch(() => {
                toast.error('Error');
            })
    };

    const handleCancel = () => {
        history.push("/admin/subjects")
    }

    return(
        <div className="edit-profile-form-container">
            <div className="base-card post-card-form-card">
                <h1>Add or Edit Subject</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='col-lg-6 subjects-crud-form-column'>
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
                                <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                            </div>
                            <div className='margin-bottom-30'>
                                <label htmlFor="">Team</label>
                                <input 
                                    {...register("team", {
                                        required: 'Required field',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.team ? 'is-invalid' : ''}`}
                                    placeholder="Team"
                                    name="team"
                                />
                                <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                            </div>
                        </div>
                        <div className='col-lg-6 subjects-crud-form-column'>
                            <div className='margin-bottom-30'>
                                <label htmlFor="">Img Url</label>  
                                    <input 
                                        {...register("imgUrl", {
                                            required: 'Required field',
                                        pattern: { 
                                            value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                            message: 'Insert a valid URL'
                                        }
                                        })}
                                        type="text"
                                        className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                        placeholder="URL of subject's image"
                                        name="imgUrl"
                                    />
                                    <div className='invalid-feedback d-block'>{errors.imgUrl?.message}</div>
                            </div>
                            <div className='margin-bottom-30'>
                                <label htmlFor="">Teacher Id</label>  
                                <select
                                    {...register("teacherId", {
                                        required: 'Required field',
                                    })}
                                    className={`form-control base-input ${errors.teacherId ? 'is-invalid' : ''}`}
                                    placeholder='Teacher' 
                                    name="teacherId"
                                    >
                                    {selectTeacher?.sort((a,b) => a.name > b.name ? 1 : -1).map(teacher => <option key={teacher.id} value={teacher.id} label={teacher.name}></option>)}
                                </select>
                            </div>
                        </div>
                        

                        <div className='margin-bottom-30'>
                            <label htmlFor="">Students</label> 
                                <Controller 
                                    name = 'students'
                                    rules = {{required: true}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectStudents}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Students"
                                            isMulti
                                            getOptionLabel={(student: User) => student.name}
                                            getOptionValue={(student: User) => student.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.students && (
                                    <div className='invalid-feedback d-block'>Required field</div>
                                )}
                        </div>
                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>
                            <button className='btn btn-outline-primary post-crud-buttons'>SAVE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;