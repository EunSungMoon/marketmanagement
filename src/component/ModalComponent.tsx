/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalComponent(props: any) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='modal'>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.img} className="mapImg" alt='시약장 약도' />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='backColor-m closeModal' title='닫기'>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}
