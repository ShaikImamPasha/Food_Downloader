import MiniCmpt from "./MiniCmpt";
const ComponentFun = ({ data, replay, replayAva, resid }) => {
  return (
    <div>
      {data &&
        data.map((data, index) => (
          <div key={index}>
            {data && data.name && (
              <MiniCmpt
                resid={resid}
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
