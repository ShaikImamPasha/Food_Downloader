import MiniCmpt from "./MiniCmpt";
const ComponentFun = ({ data, replay, replayAva }) => {
  return (
    <div>
      {data &&
        data.map((data, index) => (
          <div key={index}>
            {data && data.name && (
              <MiniCmpt
                data={data}
                indexKey={index}
                replay={replay}
                replayAva={replayAva}
              />
            )}
          </div>
        ))}
    </div>
  );
};
export { ComponentFun };
