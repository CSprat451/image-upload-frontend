import  React from 'react'
import Proptypes from 'prop-types'

// Progress bar
 const Progress = ({ percentage }) => {
     return (
        <div className='progress'>
            <div 
                className='progress-bar progress-bar-striped bg-success'
                role='progressbar' 
                style={{ width: `${percentage}%` }}
                >
                {percentage}%
                </div>
            
        </div>
     );
 };

 Progress.propTypes = {
    percentage: Proptypes.number.isRequired
 };

 export default Progress
