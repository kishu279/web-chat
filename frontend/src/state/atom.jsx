import { atom, atomFamily, selectorFamily } from "recoil";

const tokenAtom = atom({
  key: "tokenAtom",
  default: null,
});

const userNameAtom = atom({
  key: "userNameAtom",
  default: "",
});

export { tokenAtom, userNameAtom };
