import React, {
    Component
} from 'react';

class GetProducts extends React.Component {
        state = {
            isLoading: true,
            producto: [],
            error: null
        };
        getFetchUsers() {
            this.setState({
                loading: true
            }, () => {
                fetch("http://localhost:3001/products").then(res => res.json()).then(result => this.setState({
                    loading: false,
                    producto: result
                })).catch(console.log);
            });
        }
        componentDidMount() {
            this.getFetchUsers();
        }
        render() {
            const {
                producto,
                error
            } = this.state;
            return (
            <>
                <React.Fragment>
                
                <h1>All Arepas</h1>
                {
                    error ? 
                    <p>{
                        error.message
                    }  </p>: null}  {
                        producto.map(user => {
                            const {
                                name,
                                price,
                                description
                            } = user;
                            return (
                            <div key={name}>
                                <p>Name: {name}</p>
                                <p>Price: {price}</p>
                                <p>Description: {description}</p>
                                <hr />
                            </div>
                            );
                        })
                    } 
                </React.Fragment>
            </>
                
            );
        }
    }

export default GetProducts;