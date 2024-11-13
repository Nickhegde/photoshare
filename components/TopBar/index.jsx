import React, {useState, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import axios from "axios";

import "./styles.css";

function TopBar({userId, userList, isPhotos}) {
  const [version, setVersion] = useState("");
  let hashValue = window.location.hash.slice(2).split("/");
  let isPhotosPage = hashValue[0]==="photos";
  let userid =userId;
  let userDetail = userList.filter(user=>user._id === userid)[0];

  useEffect(() => {
    axios.get("/test/info").then((response) => {
      setVersion(response.data.__v);
    }).catch((err) => {
      console.log("fetch error");
      return err;
    });
  },[]);

  useEffect(()=> {
    isPhotosPage = isPhotos;
    userDetail = userList.filter(user=>user._id === userId)[0];
  },[userId, isPhotos]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        { userDetail ? 
        ( 
          <div className="header-container">
              <div>
                <h3>Nikhil Hegde</h3>
                <span>API version {version}</span>
              </div>
              <div>
                { isPhotosPage ? 
                  <h3>Photos of {userDetail?.first_name} {userDetail?.last_name}</h3> :
                  <h3>Details of {userDetail?.first_name} {userDetail?.last_name}</h3> }
              </div>
          </div>
        ) : <div>Loading...</div>}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
