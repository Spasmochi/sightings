import create from "zustand";
import { devtools } from "zustand/middleware";

export const [useStore, Store] = create(function Store(set, get) {
  devtools((set) => ({
    Logs: [],
    addLog: () => {
      let state = get();
      set({
        Logs: [
          ...state.Logs,
          {
            lat: 144,
            lng: -59,
          },
        ],
      });
    },
    removeLog: (Logs) => set({ Logs }),
  }));
});
