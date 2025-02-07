import { useRecoilState, useSetRecoilState } from "recoil";
import { dataArray, socketAtom } from "../state/atom";
import { useEffect } from "react";

const WebSocketListener = () => {
  const [socket, setSocket] = useRecoilState(socketAtom);
  const setData = useSetRecoilState(dataArray);

  useEffect(() => {
    if (socket) {
      // socket.on("message", (event) => {
      //   setData((prevData) => [...prevData, event.data]);
      // });

      socket.onmessage = (event) => {
        console.log(event);
        setData((prevData) => [...prevData, event]);
      };
    }
  }, [socket, setSocket, setData]);

  return null;
};

export default WebSocketListener;
