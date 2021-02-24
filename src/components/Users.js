import React, { Component } from "react";
import Modal from './Modal'

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users:[],
            flag:false,
            items: [],
            loading: false,
            data:{},
            showModal:false,
            dataModal: {}
        }
    }

    getModal = data => {
        this.setState({ showModal: true, dataModal: data });
      };
    
      hideModal = () => {
        this.setState({ showModal: false });
      };
    
    componentDidMount() {
        fetch('https://randomuser.me/api/')
            .then((res) => res.json())
            .then((res) => {
                const userObj = {}
                const response = res.results
                response.map((userInfo)=>{
                    userObj['gender'] = userInfo.gender
                    userObj['name']=userInfo.name.first
                    userObj['image']=userInfo.picture.medium
                    userObj['phone']=userInfo.phone
                    userObj['email']=userInfo.email
                    userObj['address']=userInfo.location.city
                    userObj['dob']=userInfo.dob.date
                  })
                  this.setState({
                    items: response,
                    data:userObj,
                    loading: true
                })
            })

            fetch('http://localhost:9000/get')
            .then((res)=> res.json())
            .then((res)=> {
                this.setState({
                    users: res,
                    flag: true
                })
            })
    }

    render() {
        var { items, loading, users, flag,data, showModal,dataModal } = this.state
        const addUser = ()=>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:9000/add', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }
        if (!loading) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            return (
                <div>
                    <h1>Random User Application</h1>
                    <div className="container">
                        {items.map((item,idx) => (
                            <div className="card" style={{width:'30%' ,marginLeft:'40%', marginTop:'20px', border:'1px solid #ccc', padding:'30px'}}>
                                <img src={item.picture.medium} className="card-img-top" alt={item.name.first}/>
                                <div className="card-body">
                                 <h5 className="card-title">Name: {item.name.first}</h5>
                                 <h5 className="card-title">Phone No: {item.phone}</h5>
                                 <a href="#" className="btn btn-primary" onClick={addUser}>Add User</a>
                                 </div>                         
                          </div>
                                         
                        ))}                  
                    </div>
                    <h2>Listed Users</h2> 
                    <div className="container">
                        {users.map((user,index) => (
                            <div className='well well-sm'>
                                <img   src={user.image} className="img-rounded" alt={user.name}/>
                               <span style = {{marginLeft:"25px"}}>Name: {user.name}</span>
                               <span style = {{marginLeft:"50px"}}>Phone: {user.phone}</span>
                               <button onClick={() => this.getModal(user)}>Popup</button>
                          </div>                                         
                        ))}  
                          <Modal
                        show={showModal}
                        onHide={this.hideModal}
                        data={dataModal}
                        />                
                    </div>
                </div>
            )
        }
    }
}

export default Users


