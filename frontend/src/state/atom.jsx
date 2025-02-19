import { atom, atomFamily, selectorFamily } from "recoil";
import { mssgSchema } from "../schema/userData";

const userNameAtom = atom({
  key: "userNameAtom",
  default: "",
});

const socketAtom = atom({
  key: "socketAtom",
  default: null,
});

const chatAtom = atom({
  key: "chatAtom",
  default: [],
});

export { userNameAtom, socketAtom, chatAtom };
