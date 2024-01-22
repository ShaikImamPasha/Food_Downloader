import { useEffect, useState } from "react";
import io from "socket.io-client";
import dotenv from "dotenv";
import { ComponentFun } from "./ComponentFun";
import { useDispatch, useSelector } from "react-redux";
import { addLoginMode } from "../../Utils/Redux/userSlice";
dotenv.config();

const MiniCmpt = ({ data, indexKey, replay, replayAva, resid }) => {
  const dispatch = useDispatch();
  const [rePlaySearch, setRePlaySearch] = useState("");
  const socket = io(process.env.Back_End_Socket_Api_Url);
  const isUserLoginData = useSelector((state) => state.user.userData);
  const [part, setPart] = useState([]);
  const [showReplayInputFiled, setshowReplayInputFiled] = useState(false);
  const [showReplayes, setShowReplayes] = useState(false);
  useEffect(() => {
    var a = data.message;
    var c = true;
    var to = "";
    var message = "";
    for (var i = 0; i < a.length; i++) {
      if (a[0] !== "@") {
        message = data.message;
        break;
      }
      if (c) {
        to = to + a[i];
      } else {
        message = message + a[i];
      }
      if (a[i] === " ") {
        c = false;
      }
    }
    setPart({ to: to, message: message });
  }, []);

  function fun() {
    if (isUserLoginData === null) {
      dispatch(addLoginMode());
    } else if (rePlaySearch !== " ") {
      socket.emit("addReply", {
        restaurantId: resid,
        commentIndex: replayAva === true ? replay : indexKey,
        newReply: {
          name: isUserLoginData.name,
          message: `@${data.name}` + " " + rePlaySearch,
        },
      });
      socket.on("replyError", (rep) => {
        console.log(rep);
      });
      setRePlaySearch("");
    }
  }

  return (
    <>
      <div className="flex items-center mb-1">
        <p className="font-bold text-blue-500 text-sm mr-1">{data.name}</p>
      </div>
      <p className="text-red-500 text-sm">
        {part.to}
        {<span className="text-gray-500 text-sm">{part.message}</span>}
      </p>
      <div className="flex items-center ml-2 text-gray-500">
        {/* like and dislike syboles */}
        <span role="img" aria-label="thumbs up" className="mr-1">
          <img
            className="w-10 h-10"
            src="https://media.istockphoto.com/id/1136351242/vector/like-social-media-hand-line-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?s=612x612&w=0&k=20&c=OnKkq5JCHkLvZ1Ck_njtTQMCyLljXsXGNhGqVpwwVUA="
          ></img>
        </span>

        <span role="img" aria-label="thumbs down" className="mr-1">
          <img
            className="w-10 h-5"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLObItZTGqju1OqgykJ21mYHcvIGR7cIlLXZAbMKe0ug&s"
          ></img>
        </span>
        <p
          onClick={() => setshowReplayInputFiled(!showReplayInputFiled)}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {showReplayInputFiled ? "Close" : "Reply ▼"}
        </p>
        <div></div>
      </div>
      {/* Single reply input */}
      {data.replies && showReplayInputFiled && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Reply"
            value={rePlaySearch}
            onChange={(e) => setRePlaySearch(e.target.value)}
            className="border p-1 w-full text-sm"
          />
          <button
            onClick={() => fun()}
            className="bg-blue-500 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none mt-2 text-sm"
          >
            Add Reply
          </button>
        </div>
      )}
      {data.replies && data.replies.length !== 0 ? (
        <p
          onClick={() => setShowReplayes(!showReplayes)}
          className="cursor-pointer text-blue-500 hover:underline flex items-center transition-transform transform ease-in-out duration-300"
        >
          <span className="mr-2">
            {data.replies.length}
            {showReplayes ? " Hide Replies" : " Show Replies"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-4 h-4 ${
              showReplayes ? "rotate-180" : ""
            } transition-transform`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </p>
      ) : null}

      {/* Multiple replies input */}
      {replayAva && showReplayInputFiled && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Reply"
            value={rePlaySearch}
            onChange={(e) => setRePlaySearch(e.target.value)}
            className="border p-1 w-full text-sm"
          />
          <button
            onClick={() => fun()}
            className="bg-blue-500 text-white px-2 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none mt-2 text-sm"
          >
            Add Reply
          </button>
        </div>
      )}

      <div className="ml-4 mt-2">
        {showReplayes && (
          <ComponentFun
            data={data.replies}
            replay={indexKey}
            replayAva={true}
            resid={resid}
          />
        )}
      </div>
    </>
  );
};

export default MiniCmpt;
