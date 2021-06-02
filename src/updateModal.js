import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap/';

class UpdateForm extends React.Component {

    render() {
        return (
            <>


                <Modal
                    show={this.props.showUpdateModal}
                    onHide={this.props.handleUpdateClose}
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Update Book Info Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(e) => this.props.UpdateForm(e)}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Book Name : </Form.Label>
                                <Form.Control onChange={(e) => this.props.updateNameInfo(e)} type="text" placeholder="Book Name" value={this.props.name} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Description : </Form.Label>
                                <Form.Control onChange={(e) => this.props.updateDescInfo(e)} type="text" placeholder="Enter Description" value={this.props.description} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Status : </Form.Label>
                                <Form.Control onChange={(e) => this.props.updateStatusInfo(e)} type="text" placeholder="Enter Status" value={this.props.status} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control onChange={(e) => this.props.updateURLInfo(e)} type="text" placeholder="Enter Image URL" value={this.props.img} />
                            </Form.Group>
                            <Button type='submit' variant="primary">UPDATE</Button>
                        </Form>
                    </Modal.Body>


                </Modal>
            </>
        )
    }
}

export default UpdateForm;
