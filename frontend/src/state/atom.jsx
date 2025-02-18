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

const chatAtom = atomFamily({
  key: "chatAtom",
  default: selectorFamily({
    key: "chatAtom/Default",
    get: ({ get }) => {
      const socket = get(socketAtom);

      const data = [];

      socket.onmessage = (event) => {
        const result = mssgSchema.safeParse(JSON.parse(event));

        if (result.success) {
          data.add(result.data);
        }
      };
    },
  }),
});

export { userNameAtom, socketAtom, chatAtom };
