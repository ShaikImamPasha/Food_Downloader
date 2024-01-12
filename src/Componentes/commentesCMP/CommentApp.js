import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ComponentFun } from "./ComponentFun";
import dotenv from "dotenv";
dotenv.config();
import MiniCmpt from "./MiniCmpt";

const CommentApp = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const socket = io(process.env.Back_End_Socket_Api_Url);

  useEffect(() => {
    socket.emit("requestInitialData", { restaurantId: 32 });

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
    socket.emit("addComment", {
      restaurantId: 32,
      newComment: {
        name: "imam",
        message: searchValue,
      },
    });

    setSearchValue("");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Add a comment"
          type="text"
          className="border p-2 w-full md:w-1/2"
        />
        <button
          onClick={pushComment}
          className="bg-blue-500 text-white px-4 py-2 mt-2 md:mt-0 md:ml-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Add Comment
        </button>
      </div>

      {commentsData && commentsData.length === 0 ? (
        <p className="w-[100px] h-[100px] border-2 border-solid"></p>
      ) : (
        <ComponentFun data={commentsData.comments} />
      )}
    </div>
  );
};

export { CommentApp };
