import create from "zustand";
import { devtools } from "zustand/middleware";

export const Store = create(
  devtools((set) => ({
    Logs: [],
    addLog: (lat, lng, time) =>
      set((state) => ({
        Logs: [
          ...state.Logs,
          {
            logId: (Math.random() * (9000 - 1 + 1)) << 0,
            lat: lat,
            lng: lng,
            time: time,
          },
        ],
      })),
    removeLog: (logId) =>
      set((state) => {
        const Logs = state.Logs.filter((log) => log.logId !== logId);
        return {
          Logs,
        };
      }),
  }))
);
