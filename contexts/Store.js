import create from "zustand";
import { devtools } from "zustand/middleware";

export const [Store] = create(
  devtools((set) => ({
    Logs: [],
    addLog: (Logs) => set({ Logs }),
    removeLog: (Logs) => set({ Logs }),
  }))
);
