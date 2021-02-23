import React, { Component } from "react";

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            loading: false
        }
    }

    componentDidMount() {
        fetch('https://randomuser.me/api/')
            .then((res) => res.json())
            .then((res) => {
                console.log(res.results)

                this.setState({
                    items: res.results,
                    loading: true
                })
            })

    }

    render() {
        var { items, loading } = this.state

        if (!loading) {
            return (
                <div>Loading...</div>
            )
        }

        else {
            return (
                <div>
                    <h1>Random User Application</h1>
                    <div class="container">
                        {items.map(item => (
                            <div className="card" style={{width:'30%' ,marginLeft:'40%', marginTop:'20px', border:'1px solid #ccc', padding:'30px'}}>
                                <img src={item.picture.medium} className="card-img-top" alt={item.name.first}/>
                                <div className="card-body">
                                 <h5 className="card-title">Name: {item.name.first}</h5>
                                 <h5 className="card-title">Phone No: {item.phone}</h5>
                                 <a href="#" className="btn btn-primary">Add User</a>
                                 </div>                         
                          </div>
                                         
                        ))}                  
                    </div>
                </div>
            )
        }
    }
}

export default Users


