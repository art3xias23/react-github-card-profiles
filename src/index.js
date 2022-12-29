import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary.js";
import { getUsernameResponse } from "./AxiosClient";

//Tasks

//Convert the classes to function components

function CardList(props) {
  console.log(`Card List Props: ${props}`);
  var data = Object.values(props);
  console.log("Card List Data: ", data[0]);
  return (
    <div>
      {data[0].map(profile => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
}

// class Form extends React.Component {
function Form(props) {
  // console.log("Form", props.onSubmit)
  // state = { userName: "", error: null };
  const [userName, updateUserName] = React.useState("");
  const [error, updateError] = React.useState("");
  const changeEvent = (event) => {
    //this.setState({userName: event.target.value});
    updateUserName(event.target.value);
  };
  const clickEvent = async (event) => {
    try {
      //Testing the event handler try catch block
      //throw "Caught some error";
      event.preventDefault();
      const resp = await getUsernameResponse(userName);
      if (resp.status == 404) {
        // this.setState({ error: "Could not find username" });
        updateError("Could not find username.");
        console.log("Form Click event response: " + resp.message);
      } else if (resp.status != 200) {
        console.log(`Failed response: ${resp}`);
      } else {
        // console.log("Axios Data: " + resp.data);
        props.onSubmit(resp.data);
        // this.setState({ userName: "" });
        updateUserName("");
        // this.setState({error: null})
        updateError(null);
      }
    } catch (error) {
      // this.setState({ error: error });
      updateError(error);
      console.log(error);
    }
  };
  //Simulating a render error to be caught by the ErrorBoundary
  //throw new Error("Something crashed")
  return (
    <>
      <input
        type="text"
        value={userName}
        onChange={(event) => changeEvent(event)}
        placeholder="github username"
      ></input>
      <button onClick={clickEvent}>AddCard</button>
      {error && <div className="error">{error}</div>}
    </>
  );
}

// class Card extends React.Component {
function Card(props) {
  console.log(`Card Profile Object Data: ${props["0"]}`);
  console.log(`Card Profile Json Data: ${JSON.stringify(props["0"])}`);
  return (
    <>
      <div className="github-profile">
        <img src={props.avatar_url} />
        <div className="info">
          <div className="name">{props.name}</div>
          <div className="company">{props.company}</div>
        </div>
      </div>
    </>
  );
}

// class App extends React.Component {
function App(props) {
  const [profiles, setProfiles] = React.useState([]);
  const [error, updateError] = useState(null);
  const addNewProfile = (profileData) => {
    try {
      //throw "App component error";
      setProfiles([...profiles, profileData]);
      console.log("App Profiles: ", profiles);
    } catch (error) {
      // this.setState({ error: error });
      updateError(error);
      console.log(error);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div>{props.title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles = {profiles} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Error BOundary only for class components */}
    {/* <ErrorBoundary> */}
      <App title="GitHub Cards App" />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
