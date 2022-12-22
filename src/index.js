import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

//Tasks
//Handle Errors
  //Network Errors
  //Wrong input
//Extract the axios library to a seperate agent type module. Code should depend only on that one module.
//Extract the state logic to a seperate module
//Convert the classes to function components
const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

class Form extends React.Component {
  state = {userName:""} 
  clickEvent = async (event) =>{
    event.preventDefault();
     const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
     this.props.onSubmit(resp.data);
     this.setState({username:""});
  }
  render() {
    return (
      <>
        <input type="text" value={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})} placeholder="github username"></input>
        <button onClick={this.clickEvent}>AddCard</button>
      </>
    );
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <>
        <div className="github-profile">
          <img src={profile.avatar_url} />
          <div className="info">
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div>
          </div>
        </div>
      </>
    );
  }
}
class App extends React.Component {
  state = {
    profiles: [],
  };

  addNewProfile = (profileData) =>{
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }

  render() {
    return (
      <>
        <div>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles = {this.state.profiles} />
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App title="GitHub Cards App" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
