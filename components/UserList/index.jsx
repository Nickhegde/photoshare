import React from "react";
import {
  Divider,
  List,
  ListItemText
} from "@mui/material";

import "./styles.css";

function UserList({userId, userList, setUserId, setIsPhotos}) {
  const onSelectUser = (listItem_id) => {
    setUserId(listItem_id);
    setIsPhotos(false);
    window.location.href =`/photo-share.html#/users/${listItem_id}`;
  };

  return (
    <div>
      <List component="nav">
        { userList.length? (
          userList.map((listItem, index) => {
          return (
            <li key={index} className={`${userId === listItem._id? "active": ""}`} onClick={()=>onSelectUser(listItem._id)}>
              <ListItemText primary={`${listItem.first_name} ${listItem.last_name}`}/>
              <ListItemText primary={<Divider/>}/>
            </li>
          );
          })) : <div>Loading...</div> }
      </List>
    </div>
  );
}

export default UserList;
