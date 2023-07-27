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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row post-crud-inputs-container'>
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
                        <input 
                            {...register("text")}
                            type="text"
                            className={`form-control base-input ${errors.text ? 'is-invalid' : ''}`}
                            placeholder="Text"
                            name="text"
                        />
                        <div className='invalid-feedback d-block'>{errors.text?.message}</div>
                    </div>
                </div>     
                <div className='post-crud-buttons-container'>
                    <button 
                        className='btn btn-outline-danger post-crud-buttons'
                        onClick={() => onCancel()}
                        >
                        CANCEL
                    </button>
                    <button className='btn btn-primary text-white post-crud-buttons'>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default AddNote;