import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import Image from 'next/image';
function Popup(props) {
    const { variant, message, changeShow } = props;
  return (
    <>
        <Toast
            className="d-inline-block m-1"
            bg={variant.toLowerCase()}
            onClose={() => props.changeShow(false)}
            show={changeShow} 
            delay={2000}
            autohide
        >
            <Toast.Header>
            <Image
                src="/holder.js/20x20?text=%20"
                width={20}
                height={20}
                className="rounded me-2"
                alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>view the transaction</small>
            </Toast.Header>
            <Toast.Body className={variant === 'Dark' && 'text-white'}>
             {message}
            </Toast.Body>
        </Toast>
    </>
  );
}

export default Popup;