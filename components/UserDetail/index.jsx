import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import axios from "axios";

import "./styles.css";

function UserDetail({userId, userList, setUserId, setIsPhotos}) {
  const [userDetail, setUserDetail] = useState([]);

  const onSeePhotos = () => {
    setUserId(userId);
    setIsPhotos(true);
    window.location.href =`/photo-share.html#/photos/${userId}`;
  };

 useEffect(()=> {
  if(userId){
    axios.get(`/user/${userId}`).then((response) => {
      setUserDetail(response.data);
    }).catch((err) => {
      console.log("fetch error");
      return err;
    });
  } else {
    setUserDetail(userList[0]);
  }
 },[userId]);

  
  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      { userDetail && userDetail.first_name ? 
      ( 
        <div>
            <h2 className="name">{userDetail.first_name} {userDetail.last_name}</h2>
            <div className="location">{userDetail.location}</div>
            <div className="occupation">{userDetail.occupation}</div>
            <div className="description">{parse(userDetail.description)}</div>
            <div className="see-photos" role="button" tabIndex="0" onClick={onSeePhotos}>Click here to see photos</div>
        </div>
      ) : <div>Loading...</div> }
    </div>
  );
}

export default UserDetail;
