import React, { useState, useEffect } from "react";
import axios from "axios";


import "./styles.css";

function UserPhotos({userId, setUserId, setIsPhotos}) {
  const [photos, setPhotos] = useState([]);
  const [seeComments, setSeeComments] = useState([]);

  useEffect(() => {
    axios.get(`/photosOfUser/${userId}`).then((response) => {
      setPhotos(response.data);
    }).catch((err) => {
      console.log("fetch error");
      return err;
    });
  },[userId]);

  const showComments = (photoId) => {
    let commentsArray = [...seeComments];
    let index = commentsArray.indexOf(photoId);
    if(index === -1){
      commentsArray.push(photoId);
    } else {
      commentsArray.splice(index, 1);
    }
    setSeeComments([...commentsArray]);
  };

  const showUserProfile = (user_id) => {
    setUserId(user_id);
    setIsPhotos(false);
    window.location.href =`/photo-share.html#/users/${user_id}`;
  };

  return (
   <div className="user-photos">
    {photos.length? (
      photos.map((photo,index) => {
      return (
        <div className="photo-container" key={index}>
          <img className="file" src={`../images/${photo.file_name}`}></img>
          <div className="file-date">Created Date & Time : {photo.date_time}</div>
          <div className="comments-container">
            { photo.comments?.length ? <div className="comment-state" role="button" tabIndex="0" onClick={()=>{ showComments(photo._id);}}>{ seeComments.indexOf(photo._id) === -1 ? "Show comments" : "Hide Comments"}</div> : null }
            <div className="comment-list">
            {seeComments.indexOf(photo._id) > -1 ? (photo.comments?.map((comment, commentindex)=> {
                return (
                  <div className="comment-info" key={commentindex}>
                    <div className="comment-date">
                      <span className="comment-name" role="button" tabIndex="0" onClick={()=>{showUserProfile(comment.user._id);}}>{comment.user.first_name} {comment.user.last_name}</span> 
                      <span>{comment.date_time} :</span>
                    </div>
                    <div className="comment">
                      {comment.comment}
                    </div>
                  </div>
                );
              })) : null}
            </div>
          </div>
        </div>
      );
    })) : <div>Loading...</div>}
   </div>
  );
}

export default UserPhotos;
