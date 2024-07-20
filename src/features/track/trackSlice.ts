import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

export interface TrackState {
  activeTrack: Track | null;
  activeTrackPosition: number | null;
}

const initialState: TrackState = {
  activeTrack: null,
  activeTrackPosition: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setActiveTrack: (state, actions: PayloadAction<TrackState>) => {
      state.activeTrack = actions.payload.activeTrack;
      state.activeTrackPosition = actions.payload.activeTrackPosition;
    },
  },
});

export const { setActiveTrack } = counterSlice.actions;

export default counterSlice.reducer;