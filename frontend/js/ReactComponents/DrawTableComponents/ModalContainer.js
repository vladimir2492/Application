import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class ModalContainer extends React.Component{
   

    render(){
        return(
          <Modal show={this.props.show} onHide={this.props.onHide} animation={true}>
          <Modal.Header closeButton onClick={this.props.onHide}>
            <Modal.Title> {this.props.title || ''} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              this.props.children
            }
          </Modal.Body>
         </Modal>
        )
    }
}



