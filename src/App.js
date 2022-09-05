import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  const [state, setState] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    id: "",
  });
  const [arr, setArr] = useState([]);
  const [test, setTest] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/app/getdata`)
      .then((data) => setdata(data.data));
  }, [data]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: state.fullName,
      username: state.username,
      email: state.email,
      password: state.password,
    };
    setArr(data);
    axios
      .post(`http://localhost:4000/app/signup`, data)
      .then((data) => console.log("===>", data));
    setState({
      ...state,
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleData = (val) => {
    setState({
      ...state,
      fullName: val.fullName,
      username: val.username,
      email: val.email,
      id: val._id,
    });
    setTest(!test);
  };
  const handleUpdate = async (e, val) => {
    e.preventDefault();
    console.log("first", val);
    const upData = {
      fullName: state.fullName,
      username: state.username,
      email: state.email,
    };
    await axios
      .put(`http://localhost:4000/app/updateData/${val._id}`, upData)
      .then((updata) => console.log(updata, "data"));

    setState({
      ...state,
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
    await axios
      .get(`http://localhost:4000/app/getdata`)
      .then((data) => setdata(data.data));
  };

  const handleDel = (e, val) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/app/del/${val._id}`)
      .then((del) => console.log(del));
    axios
      .get(`http://localhost:4000/app/getdata`)
      .then((data) => setdata(data.data));
  };

  console.log(data, arr, "val=========>");

  return (
    <div className="App">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group col-md-6">
          <label htmlFor="exampleInputEmail1">FullName</label>: &nbsp;
          <input
            type="text"
            className="form-control"
            placeholder="FullName...."
            value={state.fullName}
            onChange={(e) => {
              setState({
                ...state,
                fullName: e.target.value,
              });
            }}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group col-md-6">
          <label for="exampleInputPassword1">Username</label>: &nbsp;
          <input
            type="text"
            className="form-control"
            placeholder="Username...."
            value={state.username}
            onChange={(e) => {
              setState({
                ...state,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group col-md-6">
          <label for="email">Email</label>:&nbsp;
          <input
            type="email"
            className="form-control"
            autoComplete="off"
            placeholder="Email...."
            value={state.email}
            onChange={(e) => {
              setState({
                ...state,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group col-md-6">
          <label for="exampleInputPassword1">Password</label>:&nbsp;
          <input
            type="password"
            className="form-control"
            placeholder="Password...."
            autoComplete="off"
            value={state.password}
            onChange={(e) => {
              setState({
                ...state,
                password: e.target.value,
              });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <div>
        {data.map((val, inx) => {
          return (
            <span
              style={{ display: "flex", justifyContent: "center" }}
              key={inx}
            >
              {" "}
              <h3>{val.fullName}</h3>&nbsp;&nbsp;
              <h3>{val.username}</h3>&nbsp;&nbsp;
              <h3>{val.email}</h3>&nbsp;&nbsp;
              {/* <h3>{state.password}</h3>&nbsp;&nbsp; */}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleData(val)}
                style={{ width: "70px", height: "35px" }}
              >
                Edit
              </button>
              &nbsp;
              {!test ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    handleUpdate(e, val);
                  }}
                  style={{ width: "70px", height: "35px" }}
                >
                  Update
                </button>
              ) : (
                ""
              )}
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  setState({ id: val._id });
                  handleDel(e, val);
                }}
                style={{ width: "70px", height: "35px" }}
              >
                Delete
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
