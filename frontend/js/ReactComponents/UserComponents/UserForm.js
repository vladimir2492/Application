import React, {useState} from "react";
import UserService from "../../services/UserService"

export default class AddUserForm extends React.Component{  
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      login:'',
      password:'',
      access:'User'
    }
  }

  componentDidMount(){
    const {data} = this.props;
    this.setState({
        name: data.name,
        email: data.emai,
        login: data.login,
        password: data.password,
        access: data.access
    })
  }
  
  submitHandler = async (event) => {  
    event.preventDefault();
    const userService = new UserService();
    const {registr} = this.props;
    const {name, email, login, password, access} = this.state;
    const id = this.props.data.id;
    let result;
    if(registr === 'registr') {
      result = await userService.registr(name, email, login, password, access);  
    }
    else{
      if(this.props.readOnly){
          result = await userService.edit(id, name, email, login, password, access); 
      }else{
          result = await userService.add(name, email, login, password, access);    
      }
    }
    if (result.error) {
      alert('Wrong credential.')
      return;
    }   
    this.props.onComplete();
  }

  onCangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  

  render(){
    const {data, readOnly} = this.props;
    const typePassword = readOnly ? 'text' : 'password';
    return (      
        <form className="alert alert-primary addForm" style={{marginLeft:'1%', marginRight:'1%'}} onSubmit={(ev) => this.submitHandler(ev)}>
            <fieldset> 
            <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input id="inputName" type="text" name="name" defaultValue={data.name} className="form-control" required onChange={this.onCangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail">e-mail</label>
                <input id="inputEmail" type="email" name="email" defaultValue={data.email} className="form-control" required onChange={this.onCangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputLogin">Login</label>
                <input id="inputLogin" type="text" name="login" value={data.login} readOnly={readOnly} className="form-control" required onChange={this.onCangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input id="inputPassword" type={typePassword} value={data.password} readOnly={readOnly} name="password" className="form-control" required onChange={this.onCangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputAccess">Access</label>
                <select id="inputAccess" value={this.state.value} defaultValue={data.access} id="inputAccess" name="access" className="form-control" required onChange={this.onCangeHandler}>
                  <option value='Admin'>Admin</option>
                  <option value='User'>User</option>
                </select>
            </div>
            <button className="btn btn-primary" type="submit" style={{marginTop:'3%'}}>Submit</button>
            </fieldset>
        </form>
    )
  }
}