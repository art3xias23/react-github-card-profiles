import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile}/>)}
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
    profiles: testData,
  };

  addNewProfile = (profileData) =>{
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
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
