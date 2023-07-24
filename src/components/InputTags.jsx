import React from 'react';

const InputTags = (props) => {

    return (
        <>
            <p className='add_task_label'>{props.props.heading}</p>
            <input type={props.props.type} name={props.props.name} placeholder={props.props.placeholder}
                className='add_task_input' onChange={props.props.changeHandler} value={props.props.value} />
        </>
    );
}

export default InputTags;