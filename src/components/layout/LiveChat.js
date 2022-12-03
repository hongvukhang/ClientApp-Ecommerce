import { RiMessengerLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { FaRegGrin } from "react-icons/fa";

import classes from "./LiveChat.module.css";
import { useState } from "react";
const LiveChat = () => {
  const [hidden, setHidden] = useState(classes["box_message"]);
  const [toggle, setToggle] = useState(false);

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
        <div style={{ height: "73%" }}>
          <div className={classes["chat_content"]}>
            <div className={classes["chat_content-customer"]}>
              <span>Xin chào</span>
            </div>
            <div className={classes["chat_content-customer"]}>
              <span>Làm thế nào để xem các sản phẩm</span>
            </div>
            <div className={classes["chat_content-admin"]}>
              <span>ADMIN: Chào bạn</span>
            </div>
            <div className={classes["chat_content-admin"]}>
              <span>ADMIN: Bạn có thể vào mục shop để xem các sản phẩm</span>
            </div>
          </div>
        </div>
        <div className={classes["box_chat"]}>
          <img
            alt="icon"
            src="https://img.icons8.com/office/30/null/person-male.png"
          />
          <input type="text" placeholder="Enter Message!" />
          <button>
            <FaPaperclip />
          </button>
          <button>
            <FaRegGrin />
          </button>
          <button>
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
