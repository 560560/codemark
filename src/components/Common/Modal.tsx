import React from 'react';

type PropsType = {
    message: string,
    show: boolean
}

const Modal = ({message, show}: PropsType) => {

    return (
        <div className={show ? "modal" : "modal hided"}>
            {message}
        </div>
    );
}

export default Modal