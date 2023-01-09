import React, { useState, useEffect } from "react";
import { FeedOpenedCont } from "./FeedOpenedCont";
import FeedOpenedNav from "./FeedOpenedNav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });

export const FeedOpenedComp = () => {
  const location = useLocation();
  const [postDetails, setPostDetails] = useState(location.state.postDetails);
  useEffect(() => {
    apiCall();
    socket.on("newComment", (data) => {
      setPostDetails(...data);
    });
  }, []);

  const apiCall = async () => {
    const allTweets = await axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        return res.data;
      });
    const data = allTweets.filter((elem) => elem.id === postDetails.id);
    socket.emit("sendComment", data);
    setPostDetails(...data);
  };
  function reRender() {
    apiCall();
  }

  return (
    <div>
      <FeedOpenedNav />
      <FeedOpenedCont
        postDetails={postDetails}
        setPostDetails={setPostDetails}
        reRender={reRender}
      />
    </div>
  );
};
