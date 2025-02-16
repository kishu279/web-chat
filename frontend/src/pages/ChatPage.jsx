import { useState } from "react";
import Logo from "../components/Logo";

const ChatPage = () => {
  const [inputText, setInputText] = useState("");
  return (
    <div>
      <div className="border display flex justify-between h-10 items-center">
        <div className="ml-4">
          <Logo />
        </div>
      </div>

      <div className="border">
        <div className="mt-10 place-items-center">
          <div className="p-5 border h-[750px] w-[1300px] overflow-x-scroll font-mono font-medium text-xl">
            Text
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
            onClick={() => {}}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
