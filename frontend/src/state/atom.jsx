import { atom } from "recoil";

const socketAtom = atom({
  key: "socketAtom",
  default: null,
});

const dataArray = atom({
  key: "dataArray",
  default: [],
});

export { socketAtom, dataArray };
