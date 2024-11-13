import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import { Grid, Paper } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

import "./styles/main.css";

function UserDetailRoute({userId, userList, setUserId, setIsPhotos}) {
  return <UserDetail userId={userId} userList={userList} setUserId={setUserId} setIsPhotos={setIsPhotos}/>;
}


function UserPhotosRoute({userId, setUserId, setIsPhotos}) {
  return <UserPhotos userId={userId} setUserId={setUserId} setIsPhotos={setIsPhotos}/>;
}

function UserListRoute(userid, userList, setUserId, setIsPhotos) {
  return <UserList userId={userid} userList={userList} setUserId={setUserId} setIsPhotos={setIsPhotos}/>;
}

function PhotoShare() {
  const [userid, setUserId] = useState("");
  const [isPhotos, setIsPhotos] = useState(window.location.hash.slice(2).split("/")[0]==="photos");
  const [userList, setUserList] = useState([]);

  useEffect(()=> {
    axios.get("/user/list").then((response) => {
      setUserList(response.data);
      setUserId(response.data[0]._id);
    }).catch((err) => {
      console.log("fetch error");
      return err;
    });
  },[]);

  return (
    <HashRouter>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar userId={userid} userList={userList} isPhotos={isPhotos}/>
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {UserListRoute(userid, userList, setUserId, setIsPhotos)}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item" style={{overflow: "auto"}}>
              <Routes>
                <Route path="/" element={<UserDetailRoute userId={userid} userList={userList} setUserId={setUserId} setIsPhotos={setIsPhotos}/>}/>
                <Route path="/users/:userId" element={<UserDetailRoute userId={userid} userList={userList} setUserId={setUserId} setIsPhotos={setIsPhotos}/>} />
                <Route path="/photos/:userId" element={<UserPhotosRoute userId={userid} setUserId={setUserId} setIsPhotos={setIsPhotos}/>} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </HashRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById("photoshareapp"));
root.render(<PhotoShare />);
