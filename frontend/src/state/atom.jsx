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

const userAtom = atom({
  key: "userAtom",
  default: {},
});

export { userAtom, socketAtom, chatAtom };
