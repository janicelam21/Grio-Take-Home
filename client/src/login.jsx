import React from 'react'
import axios from 'axios';
import Homepage from './homepage.jsx'

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      redirectTo: false,
      token: '',
      count: 0,
      nextCount: 0,
      showPopup: false
    }
    this.textInput = this.textInput.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.incrementCount = this.incrementCount.bind(this)
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this)
  }

  textInput(e, stateKey) {
    this.setState({[stateKey]: e.target.value})
  }

  authenticate(e) {
    e.preventDefault();
    axios.post('/authenticate', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      if(response.data.token) {
        this.setState({redirectTo: true})
        this.setState({token: response.data.token})
      } 
    }) 
    .catch(err => {
      console.log(err)
    })
  }

  incrementCount(e) {
    e.preventDefault()
    axios.post('/calc', {
      count: this.state.count
    },{
      headers: {'Authorization': "bearer " + this.state.token}
    })
    .then(res => {
      this.setState({nextCount: res.data.nextCount})
      this.setState({showPopup: !this.state.showPopup})
    })
    .catch()
  }

  confirm() {
    this.setState({count: this.state.nextCount})
    this.setState({showPopup: !this.state.showPopup})
  }

  cancel() {
    this.setState({showPopup: !this.state.showPopup})
  }

  render() {
    return (
      <div>
        {!this.state.redirectTo ? 
        <div>
          <form>
            <label>
              Username:
              <input type="text" name="username" onChange={(e) => this.textInput(e,'username')}/>
            </label>
            <label>
              Password:
              <input type="text" name="password" onChange={(e) => this.textInput(e,'password')}/>
            </label>
            <button onClick={this.authenticate}>Enter</button>
          </form>
        </div>
        :
        <Homepage count={this.state.count} 
                  nextCount={this.state.nextCount} 
                  incrementCount = {this.incrementCount}
                  showPopup = {this.showPopup}
                  confirm = {this.confirm}
                  cancel = {this.cancel}/>

      }
      </div>
    )
  }
}

export default LogIn