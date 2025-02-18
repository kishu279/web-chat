import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { socketAtom, userNameAtom } from "../state/atom";
import { mssgSchema } from "../schema/userData";
import { useNavigate } from "react-router";

const ChatPage = () => {
  const [inputText, setInputText] = useState("");
  const setSocket = useSetRecoilState(socketAtom);
  const socket = useRecoilValue(socketAtom);
  const token = localStorage.getItem("auth-token");
  const navigation = useNavigate();

  // Group name
  const [grpName, setGrpName] = useState("");
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [showGrpNdName, setShowGrpNdName] = useState(true);

  function handleGroupNdName() {
    if (token == null) {
      setTimeout(() => {
        navigation("/");
      }, 2000);

      throw new Error("Token not found unable to login");
    }

    try {
      const ws = new WebSocket(`http://localhost:3000`); // we have to send the group name opn making conection

      ws.onopen = () => {
        setSocket(ws); // Atom we have stored the socket object
        setShowGrpNdName(false); // when group and user name are setted
        console.log("Connected to the chat server !!");
      };

      ws.onerror = (error) => {
        console.error(error);
      };

      ws.onclose = (event) => {
        console.log("Connection is closed", event);
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <div>
      <div className="border display flex justify-between h-10 items-center">
        <div className="ml-4">
          <Logo />
        </div>
      </div>

      {/* Set Group Name and User Name */}
      <div>
        {showGrpNdName && (
          <div>
            <div className="h-[100px] gap-10 flex display items-center justify-self-center">
              <input
                type="text"
                value={grpName}
                onChange={({ target: { value } }) => {
                  setGrpName(value);
                }}
                className="border h-10 w-68 p-5 text-xl"
                placeholder="Group Name ..."
              />
              <input
                type="text"
                value={userName}
                onChange={({ target: { value } }) => {
                  setUserName(value);
                }}
                className="border h-10 w-68 p-5 text-xl"
                placeholder="User Name ..."
              />
              <button
                className="border  h-[2px] w-10 p-5 rounded-2xl bg-amber-300 border-b-amber-50"
                onClick={() => {
                  handleGroupNdName();
                }}
              >
                <p>OK</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {!showGrpNdName && (
          <div>
            <div className="border">
              <div className="mt-10 place-items-center">
                <div className="p-5 border h-[750px] w-[1300px] overflow-x-scroll font-mono font-medium text-xl">
                  text
                </div>
              </div>
              <div className="gap-8 flex justify-self-center mt-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={({ target: { value } }) => {
                    setInputText(value);
                  }}
                  placeholder="text ..."
                  className="border bg-gray-300 w-[500px] h-[42px] text-2xl px-2 rounded-xl"
                />
                <button
                  className="border rounded-2xl h-[42px] text-xl w-[60px] "
                  onClick={() => {
                    if (socket != null) {
                      const dataObject = {
                        group: grpName,
                        user: {
                          userName: userName,
                          token: token,
                        },
                        data: inputText,
                        timestamp: new Date().toISOString(),
                      };

                      const result = mssgSchema.safeParse(dataObject);

                      if (!result.success) {
                        console.log(result.error);
                        throw new Error(result.error.format());
                      }

                      socket.send(JSON.stringify(result.data)); // object
                      console.log(result.data);
                    }
                  }}
                >
                  send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
