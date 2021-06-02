import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { Card, Button, Modal } from 'react-bootstrap/';
import { withAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import UpdateForm from './updateModal';


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            showBooksComponent: false,
            server: process.env.REACT_SERVER,
            name: '',
            img: '',
            description: '',
            status: '',
            showModal: false,
            showUpdateModal: false,
        }
    }
    componentDidMount = async () => {

        const book = await axios.get(`${this.state.server}/book`, { params: { email: this.props.auth0.user.email } });
        this.setState({
            book: book.data,
            showBooksComponent: true,
        });
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleUpdateClose = () => {
        this.setState({
            showUpdateModal: false
        })
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    handleUpdateShow = (idx) => {
        const chosenBook = this.state.book.filter((val,index)=>{
            return idx === index;
        })
        console.log(chosenBook);
        this.setState({
            showUpdateModal: true,
            index:idx,
            name:chosenBook[0].name,
            description:chosenBook[0].description,
            status:chosenBook[0].status,
            img:chosenBook[0].img,
        })
    }



    updateName = (event) => {
        this.setState({
            name: event.target.value
        })

    }

    updateDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    updateURL = (event) => {
        this.setState({
            img: event.target.value
        })
    }

    updateStatus = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    getBook = async (event) => {
        event.preventDefault();
        const bookFormData = {
            email: this.props.auth0.user.email,
            name: this.state.name,
            description: this.state.description,
            img: this.state.img,
            status: this.state.status,
        }
        const newbook = await axios.post(`${this.state.server}/addBook`, bookFormData)
        this.setState({
            book: newbook.data
        })

    }

    deleteHandler = async (index) => {
        const email = {
            email: this.props.auth0.user.email,
        }
        let newbook = await axios.delete(`${this.state.server}/deleteBook/${index}`, { params: email })
        this.setState({
            book: newbook.data,
        })
    }

    UpdateForm = async (e)=>{
        e.preventDefault();
        const bookData = {
            name: this.state.name,
            description:this.state.description,
            status:this.state.status,
            img:this.state.img,
            email: this.props.auth0.user.email,
        }
        let booksData = await axios.put(`${this.state.server}/updateBook/${this.state.index}`,bookData)
        this.setState({
            book:booksData.data
        })
    }

    

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Books
                </Button>

                <UpdateForm
                handleUpdateClose={this.handleUpdateClose}
                showUpdateModal={this.state.showUpdateModal}
                UpdateForm={this.UpdateForm}
                img={this.state.img}
                status={this.state.status}
                description={this.state.description}
                name={this.state.name}
                updateURLInfo={this.updateURL}
                updateStatusInfo={this.updateStatus}
                updateDescInfo={this.updateDesc}
                updateNameInfo={this.updateName}
                handleUpdateShow={this.handleUpdateShow}
                 />

                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Book Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(e) => this.getBook(e)}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Book Name : </Form.Label>
                                <Form.Control onChange={(e) => this.updateName(e)} type="text" placeholder="Book Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Description : </Form.Label>
                                <Form.Control onChange={(e) => this.updateDesc(e)} type="text" placeholder="Enter Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Status : </Form.Label>
                                <Form.Control onChange={(e) => this.updateStatus(e)} type="text" placeholder="Enter Status" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control onChange={(e) => this.updateURL(e)} type="text" placeholder="Enter Image URL" />
                            </Form.Group>
                            <Button type='submit' variant="primary">ADD BOOK</Button>
                        </Form>
                    </Modal.Body>


                </Modal>

                {this.state.showBooksComponent &&

                    this.state.book.map((item, index) => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.iamge} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        <p>{item.description}</p>
                                        <p>{item.status}</p>
                                    </Card.Text>
                                    <Button onClick={() => this.deleteHandler(index)} variant="primary">DELETE BOOK</Button>
                                    <Button onClick={() => this.handleUpdateShow(index)} variant="primary">UPDATE BOOK</Button>
                                </Card.Body>
                            </Card>

                        )
                    })

                }

            </>
        )
    }



}

export default withAuth0(BestBooks);



