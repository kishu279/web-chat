import { useEffect, useState } from "react";
import { socketAtom } from "./state/socketAtom";
import { useRecoilState } from "recoil";

const App = () => {
  const [count, setCount] = useState(0);
  const [inputField, setInputField] = useState("");
  const [socket, setSocket] = useRecoilState(socketAtom);
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://x.x.x.x:3000"); // instead of localhost we can use the ip address

    ws.onopen = () => {
      console.log("Connected Successfully");
      setSocket(ws); // on successfull connection
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    ws.onmessage = (mssg) => {
      setData((prev) => [...prev, mssg.data]);
      // console.log(mssg);
      console.log(`send successfully`);
    };

    ws.onclose = () => {
      console.log("connection interrupted !!!");
    };
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data, setData]);

  return (
    <div>
      <div className="border ">
        <div className="font-mono text-2xl justify-self-center">Web-Chat</div>
      </div>
      <div>
        <input
          type="text"
          value={inputField}
          onChange={({ target: { value } }) => {
            setInputField(value);
          }}
          placeholder="enter text..."
        />
        <button
          onClick={() => {
            socket.send(inputField);
          }}
        >
          send
        </button>
      </div>
      <div>{inputField}</div>
      <div>
        {data &&
          data.map((mssg) => {
            return <p key={count}>{mssg}</p>;
          })}
      </div>
    </div>
  );
};

export default App;
