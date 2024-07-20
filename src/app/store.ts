import trackSlice from "@/features/track/trackSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { activeTrack: trackSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
