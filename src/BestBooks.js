import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showBooksComponent: false,
            server: process.env.REACT_SERVER_URL,
        }
    }
    componentDidMount = async () => {

        const { user } = this.props.auth0;
        const books = await axios.get(`http://localhost:3001/books`, { params: { email: this.props.auth0.user.email } });

        this.setState({
            books: books.data,
            showBooksComponent: true,
        });
    }
    // const books = await axios.get('http://localhost:3001/books', { params: { email: this.props.auth0.user.email } })
    // console.log('books', books.data)
    // this.setState({
    //   books: books.data,

    render() {
        return (
            <>

                {this.state.showBooksComponent &&
                    this.state.books.map(item => {
                        return (
                            <Carousel style={{width:'400px'}}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={item.iamge}
                                        alt="First slide"

                                    />
                                    <Carousel.Caption>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>
                                            {item.status}
                                        </p>


                                    </Carousel.Caption>
                                </Carousel.Item>

                            </Carousel>
                        )
                    })}


            </>
        )
    }



}

export default withAuth0(BestBooks);