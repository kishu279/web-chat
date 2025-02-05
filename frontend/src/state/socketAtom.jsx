import { atom } from "recoil";

const socketAtom = atom({
  key: "socketAtom",
  default: null,
});

export { socketAtom };
