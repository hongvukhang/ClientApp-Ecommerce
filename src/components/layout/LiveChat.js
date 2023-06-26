import { RiMessengerLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { FaRegGrin } from "react-icons/fa";

import classes from "./LiveChat.module.css";

import axios from "axios";
import { useCookies } from "react-cookie";
import openSocket from "socket.io-client";
import { useState, useEffect, useRef } from "react";

const LiveChat = () => {
  const [hidden, setHidden] = useState(classes["box_message"]);
  const [toggle, setToggle] = useState(false);
  const [cookies] = useCookies();
  const [msg, setMsg] = useState([]);

  const [msgSend, setMsgSend] = useState("");
  useEffect(() => {
    const dataReq = {
      email: cookies.email,
      token: cookies.token,
      emailChat: cookies.email,
    };

    axios
      .post("/getChatUser", dataReq)
      .then((res) => {
        setMsg(res.data[0].msg);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const socket = openSocket("https://web-ecommerce-xzk6.onrender.com/");
    socket.on("msg", (data) => {
      const message = [...msg];
      message.push({
        _id: Math.random(),
        message: data.msg.msg,
        sender: data.msg.sender,
      });
      setMsg(message);
    });
  });

  const toggleHandler = () => {
    setToggle((toggle) => !toggle);
  };

  const hiddenScroll = () => {
    if (window.scrollY >= 1800) {
      setHidden(`${classes["box_message"]} ${classes["hidden"]}`);
    } else {
      setHidden(classes["box_message"]);
    }
  };
  window.addEventListener("scroll", hiddenScroll);

  const sendMsgHandler = () => {
    if (msgSend !== "") {
      const data = {
        msg: msgSend,
        email: cookies.email,
        sender: cookies.email,
      };

      axios
        .post("/room-chat", data)
        .then(() => {
          setMsgSend("");
        })
        .catch((err) => console.log(err));
    }
  };

  //// Scroll to bottom chat
  const msgRef = useRef();
  const scrollToBottom = () => {
    msgRef.current.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className={hidden}>
      <div
        style={!toggle ? { display: "none" } : { display: "block" }}
        className={classes.liveChat}
      >
        <div className={classes["box_title"]}>
          <h4>Customer Support</h4>
          <button>Let's Chat App</button>
        </div>
        <div style={{ height: "73%", overflow: "scroll" }}>
          <div className={classes["chat_content"]}>
            {msg.map((message) => {
              if (message.sender !== "admin") {
                return (
                  <div
                    key={message._id}
                    className={classes["chat_content-customer"]}
                  >
                    <span>{message.message}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={message._id}
                    className={classes["chat_content-admin"]}
                  >
                    <span>ADMIN: {message.message}</span>
                  </div>
                );
              }
            })}
            <div ref={msgRef} />
          </div>
        </div>
        <div className={classes["box_chat"]}>
          <img
            alt="icon"
            src="https://img.icons8.com/office/30/null/person-male.png"
          />
          <input
            onChange={(e) => setMsgSend(e.target.value)}
            type="text"
            value={msgSend}
            placeholder="Enter Message!"
          />
          <button>
            <FaPaperclip />
          </button>
          <button>
            <FaRegGrin />
          </button>
          <button onClick={sendMsgHandler}>
            <FaTelegramPlane />
          </button>
        </div>
      </div>
      <button onClick={toggleHandler} className={classes["btn_toggle"]}>
        <RiMessengerLine />
      </button>
    </div>
  );
};

export default LiveChat;
