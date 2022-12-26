import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary.js";
import { getUsernameResponse } from "./AxiosClient";

//Tasks

//Extract the state logic to a seperate module
//Convert the classes to function components
const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Form extends React.Component {
  state = { userName: "", error: null };
  changeEvent = (event) =>{
    this.setState({userName: event.target.value});
  }
  clickEvent = async (event) => {
    try {
      //Testing the event handler try catch block
      //throw "Caught some error";
      event.preventDefault();
      const resp = await getUsernameResponse(this.state.userName)
      if (resp.status == 404) {
        this.setState({ error: "Could not find username" });
        console.log(resp.message);
      }
      else if(resp.status != 200){
        console.log(`Failed response: ${resp}`)
      }
       else {
        this.props.onSubmit(resp.data);
        this.setState({ userName: "" });
        this.setState({error: null})
      }
    } catch (error) {
      this.setState({ error: error });
      console.log(error);
    }
  };
  render() {
    //Simulating a render error to be caught by the ErrorBoundary
    //throw new Error("Something crashed")
    return (
      <>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.changeEvent(event)}
          placeholder="github username"
        ></input>
        <button onClick={this.clickEvent}>AddCard</button>
      {this.state.error && <div className="error">{this.state.error}</div>}
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
    error: null,
  };

  addNewProfile = (profileData) => {
    try {
      //throw "App component error";
      this.setState((prevState) => ({
        profiles: [...prevState.profiles, profileData],
      }));
    } catch (error) {
      this.setState({ error: error });
      console.log(error);
    }
  };

  render() {
    return (
      <>
      {this.state.error && <div className="error">{this.state.error}</div>}
        <div>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App title="GitHub Cards App" />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
