import React from 'react'

export default function AlertMessage(props) {
    return (
        <div><br/><br/>
        <div className={`alert alert-${props.category} alert-dismissible fade show mt-2 position-absolute`} style={{zIndex:"12", width:"100%"}} role='alert'>
            <strong>{props.message}</strong>
            <button type='button' className='btn-close' onClick={() => props.flashMessage(null, null)}></button>
        </div>
        </div>
    )
}