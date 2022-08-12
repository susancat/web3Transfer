import { Toast } from 'react-bootstrap';
import Image from 'next/image';

const Popup = ({show, setShow, variant, message}) => {
    const handleClose = () => setShow(false);

  return (
    <>
        <Toast
            className="d-inline-block m-1"
            bg={variant.toLowerCase()}
            onClose={handleClose}
            show={show}
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
            <small className='text-dark'>view the transaction</small>
            </Toast.Header>
            <Toast.Body className={variant === 'Dark' && 'text-dark'}>
             {message}
            </Toast.Body>
        </Toast>
    </>
  );
}

export default Popup;