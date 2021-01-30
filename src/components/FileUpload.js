import React, { Fragment, useState } from 'react'
import Message from './Message'
import Progress from './Progress'
import axios from 'axios'

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [returnedFile, setReturnedFile] = useState('');
    
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setReturnedFile('')
    }


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)

        try {
            const res = await axios.post('http://localhost:5000/ascii', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                // Clear progress bar percentage
                setTimeout(() => setUploadPercentage(0), 10000);
                }

            });

            setReturnedFile(res.data);

            setMessage('File Uploaded');

            setFilename('Choose File')
        } catch(error) {
            // if(error.response.status === 500) {
            //     setMessage('There was a problem with the server')
            // } else {
            //     setMessage(error.response.data.msg); // msg comes from server side
            // }
            console.log(error)
        }
    };

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input 
                        type="file" 
                        accept=".jpg, .png, .jpeg, .mp4"
                        maxfilesize={524288}
                        className="custom-file-input" 
                        id="customFile" 
                        onChange={onChange}
                    />
                    <label 
                        className="custom-file-label" 
                        htmlFor="customFile">{filename}
                    </label>
                </div>

                <Progress percentage={uploadPercentage} />

                <input 
                    type='submit' 
                    value="Submit" 
                    className='btn btn-primary btn-block mt-4'
                />
                
            </form>
            
            <div className="image-container">
                <div className='image-preview'>
                    <img 
                        src={file? URL.createObjectURL(file) : null}
                        alt={file? file.name : null} 
                        height='300px' 
                        width='400px'
                    />
                </div>

                { returnedFile ? <div className='ascii-preview'>
                    <img 
                        src={returnedFile? returnedFile : null}
                        alt={returnedFile? returnedFile : null} 
                        height='600px' 
                        width='800px'
                    />
                </div> : null }
            </div>
        </Fragment>
    )
}

export default FileUpload