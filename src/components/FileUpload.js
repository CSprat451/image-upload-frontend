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
            const res = await axios.post('http://asciiartapplication-env.eba-i68dakre.us-east-1.elasticbeanstalk.com//ascii', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // Progress bar percentage
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
            // TO DO: Add error messages.
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

                {/* Progress Bar */}
                <Progress percentage={uploadPercentage} />

                {/* Submit button */}
                <input 
                    type='submit' 
                    value="Submit" 
                    className='btn btn-primary btn-block mt-4'
                />
                
            </form>
            
            {/* Uploaded image preview */}
            <div className="image-container">
                <div className='image-preview'>
                    <img 
                        src={file? URL.createObjectURL(file) : null}
                        alt={file? file.name : null} 
                        height='300px' 
                        width='400px'
                    />
                </div>

                {/* Ascii image preview */}
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