import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ComponentFun } from "./ComponentFun";
import { addCommentModel } from "../../Utils/Redux/userSlice";
import { useSelector } from "react-redux";
import dotenv from "dotenv";
dotenv.config();
import { useDispatch } from "react-redux";
import { addLoginMode } from "../../Utils/Redux/userSlice";
const CommentApp = ({ resid }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const isUserLoginData = useSelector((state) => state.user.userData);
  const socket = io(process.env.Back_End_Socket_Api_Url);
  useEffect(() => {
    socket.emit("requestInitialData", { restaurantId: resid });

    socket.on("initialData", (initialData) => {
      setCommentsData(initialData);
    });

    socket.on("newComment", (newComment) => {
      setCommentsData(newComment);
    });

    socket.on("newReply", (initialData) => {
      setCommentsData(initialData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const pushComment = () => {
    if (isUserLoginData === null) {
      dispatch(addLoginMode());
    } else if (searchValue !== "") {
      socket.emit("addComment", {
        restaurantId: resid,
        newComment: {
          name: isUserLoginData.name,
          message: searchValue,
        },
      });
    }

    setSearchValue("");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Add Your Opinion On This Restaurant"
          type="text"
          className="border p-2 w-full md:w-1/2"
        />
        <button
          onClick={pushComment}
          className="bg-blue-500 text-white px-4 py-2 mt-2 md:mt-0 md:ml-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Add
        </button>
        <button
          className=" text-gray-500 ml-3 hover:text-red-700 transition duration-300 "
          onClick={() => dispatch(addCommentModel())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {commentsData && commentsData.length === 0 ? (
        <p className="w-[100px] h-[100px] border-2 border-solid"></p>
      ) : (
        <ComponentFun data={commentsData.comments} resid={resid} />
      )}
    </div>
  );
};

export { CommentApp };
