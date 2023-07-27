import { Note } from 'types';
import './styles.css';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

type Props = {
    onCancel: Function;
    userId: number;
    subjectId: number;
}

const AddNote = ({onCancel, userId, subjectId} : Props) => {

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Note>();

    const onSubmit = (formData : Note) => {

        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 3);
        formData.moment = startDate.toISOString();

        formData.teacherId = userId;
        formData.subjectId = subjectId;

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/notes",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('Success', response.data);
                toast.success('Success!');
                onCancel();

                setValue('text', '');
                setValue('title', '');
            })
            .catch(() => {
                toast.error('Error');
            })
    };

    return(
        <div className='add-note-container'>
            <h1>Add Note</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='add-note-form'>
                <div className='row add-note-inputs-container'>
                    <div className='margin-bottom-30'>
                        <label htmlFor="">Title</label>
                        <input 
                            {...register("title", {
                            required: 'Campo obrigatório',
                            })}
                            type="text"
                            className={`form-control base-input ${errors.title ? 'is-invalid' : ''}`}
                            placeholder="Title"
                            name="title"
                        />
                        <div className='invalid-feedback d-block'>{errors.title?.message}</div>
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
                        <div className='invalid-feedback d-block'>{errors.text?.message}</div>
                    </div>
                </div>     
                <div className='add-note-buttons-container'>
                    <button 
                        className='btn btn-outline-danger add-note-button'
                        onClick={() => onCancel()}
                        >
                        CANCEL
                    </button>
                    <button className='btn btn-primary text-white add-note-button'>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default AddNote;