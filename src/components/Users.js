import React, { Component } from "react";
import Modal from './Modal'
import Pagination from './Pagination';
import { addUserAction } from "../store/action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


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
            dataModal: {},
            perPage: 5,
            currentPage: 1
        }
    }

    getModal = data => {
        this.setState({ showModal: true, dataModal: data });
      };
    
      hideModal = () => {
        this.setState({ showModal: false });
      };

      removeUser = userId => {
          console.log(userId)
        const requestOptions = {
          method: 'DELETE'
        };
        fetch("http://localhost:9000/delete/" + userId, requestOptions).then((response) => {
          return response.json();
        }).then((result) => {

        });
        window.location.reload();

      }

      removeAllUser = () => {
        console.log("delete all user")
        const requestOptions = {
            method: 'DELETE'
        };
        fetch("http://localhost:9000/deleteAll" , requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
        });
        window.location.reload();

    }
    
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
                this.props.addUserAction(res)
                // this.setState({
                //     users: res,
                //     flag: true
                // })
            })
    }

    render() {
        console.log(this.props)
        var { items, loading,  data, showModal,dataModal,perPage, currentPage} = this.state
        var {users} = this.props

          // Get current posts
        const indexOfLastPost = currentPage * perPage;
        const indexOfFirstPost = indexOfLastPost - perPage;
        const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNumber => this.setState({currentPage:pageNumber});

        // add a new user
        const addUser = ()=>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:9000/add', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
                window.location.reload();

        }
        if (!loading) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            return (
                <div>
                    <h1 style={{textAlign:'center'}}>Random User Generator </h1>
                    <div className="container">
                        {items.map((item,idx) => (
                          <div style={{width:'85%'}}>
                            <button href="#" className="btn btn-danger" onClick={this.removeAllUser} >Clear All</button>
                            <button href="#" className="btn btn-success" onClick={addUser}>Add User</button>
                                <div className="card" style={{width:'30%' ,marginLeft:'45%', marginTop:'20px', border:'1px solid #ccc', padding:'40px', backgroundColor:'lightslategray'}}>
                                    <img src={item.picture.medium} className="card-img-top" alt={item.name.first}/>
                                    <div className="card-body" style={{}}>
                                        <h5 className="card-title">Name: {item.name.first}</h5>
                                        <h5 className="card-title">Phone No: {item.phone}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}                  
                    </div>
                    <div className="container" style={{marginTop:'50px'}}>
                        {currentPosts.map((user,index) => (
                          <div>     
                              <div className='well well-sm' style={{width:'80%', display:'inline-table', marginLeft:'10%',backgroundColor:'lavender',color:'blue' }} onClick={() => this.getModal(user)}>
                                <img   src={user.image} className="img-rounded" alt={user.name}/>
                               <span style = {{marginLeft:"25px"}}>Name: {user.name}</span>
                               <span style = {{marginLeft:"50px"}}>Phone: {user.phone}</span>
                              </div>
                              <button style={{padding:'5px', marginLeft:"10px", marginBottom:'20px' , display:'inline',left:'50px', color:'red'}} onClick={() => { this.removeUser(user.id) }} className="delete-btn">Delete</button>
                          </div>
                        ))}  
                        <Modal
                        show={showModal}
                        onHide={this.hideModal}
                        data={dataModal}
                        />                
                    </div>
                    <Pagination
                    postsPerPage={perPage}
                    totalPosts={users.length}
                    paginate={paginate}
                />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        users:state.users.data
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {addUserAction},
        dispatch
    )

}



export default connect(mapStateToProps, mapDispatchToProps)(Users) 


