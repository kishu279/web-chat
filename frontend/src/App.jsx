import { useEffect, useState } from "react";
import { dataArray, socketAtom } from "./state/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import WebSocketListener from "./components/WebSocketListener";

const App = () => {
  const [inputField, setInputField] = useState({ data: "" });
  const [socket, setSocket] = useRecoilState(socketAtom);
  const data = useRecoilValue(dataArray);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.231.158:3000"); // instead of localhost we can use the ip address

    ws.onopen = () => {
      console.log("Connected Successfully");
      setSocket(ws); // on successfull connection
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    // ws.onmessage = (mssg) => {
    //   setData((prev) => [...prev, mssg.data]);
    //   // console.log(mssg);
    //   console.log(`send successfully`);
    // };

    ws.onclose = () => {
      console.log("connection interrupted !!!");
    };
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <WebSocketListener />
      <div className="border ">
        <div className="font-mono text-2xl justify-self-center">Web-Chat</div>
      </div>
      <div>
        <input
          type="text"
          value={inputField.data}
          onChange={({ target: { value } }) => {
            setInputField((prevData) => ({ ...prevData, data: value }));
          }}
          placeholder="enter text..."
        />
        <button
          onClick={() => {
            socket.send(inputField.data);
          }}
        >
          send
        </button>
      </div>
      <div>{inputField.data}</div>
      <div>
        {data &&
          data.map((mssg) => {
            return <p key={mssg.timestamp}>{mssg.data}</p>;
          })}
      </div>
    </div>
  );
};

export default App;
