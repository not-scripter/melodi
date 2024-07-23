import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import { Track } from "react-native-track-player";

export interface SettingsProps {
  appearance: {
    colors: {
      theme: "system" | "dynamic" | "pureBlack";
    };
    typography: {
      useSystemFont: boolean;
    };
  };
  player: {
    controls: {
      resumePlayback: boolean;
    };
  };
  storage: {
    searchHistory: {
      isEnabled: boolean;
      data: string[];
    };
    imageCache: {
      maxSize: "128mb" | "256mb";
    };
    songCache: {
      maxSize: "512mb" | "1gb";
    };
  };
  others: {};
  info: {};
}

const initialState: SettingsProps = {};

export const trackSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setActiveTrack: (state, actions: PayloadAction<SettingsProps>) => {},
  },
});

export const { setActiveTrack } = trackSlice.actions;

export default trackSlice.reducer;
