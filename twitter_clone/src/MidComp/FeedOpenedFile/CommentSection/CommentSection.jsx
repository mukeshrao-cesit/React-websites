import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CommentSection.css";
import { v4 as uuidv4 } from "uuid";

function CommentSection({ setPostContent }) {
  const userDetails = useSelector((state) => state.userDetails);
  const [commentInput, setCommentInput] = useState("");
  function handleNewComment(e) {
    e.preventDefault();
    const payload = {
      profileId: userDetails.profileId,
      profileName: userDetails.profileName,
      profileImg: userDetails.profileImg,
      description: commentInput,
      id: uuidv4(),
      documents: "",
      comments: [],
      likesCount: 0,
      commentsCount: 0,
      retweetCount: 0,
      isAlreadyLiked: false,
    };
    setPostContent((prev) => {
      return { ...prev, comments: [payload, ...prev.comments] };
    });
  }
  function textGrow(event) {
    event.target.style.height = "3px";
    event.target.style.height = event.target.scrollHeight + "px";
  }
  return (
    <div>
      <div className="commentSectionContainer">
        <div className="commentSectionProfile">
          <img src={userDetails.profileImg} alt="profile" />
        </div>
        <div className="commentSectionTextArea">
          <form onSubmit={handleNewComment}>
            <textarea
              id="commentTextArea"
              // value={}
              onInput={textGrow}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Tweet your reply"
            ></textarea>
            <button type="submit">Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CommentSection;
