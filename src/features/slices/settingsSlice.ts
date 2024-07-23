import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ThemeProps = "system" | "dynamic" | "pureBlack";
export type ImageCacheProps = "128mb" | "256mb";
export type SongCacheProps = "512mb" | "1gb";

export interface SettingsProps {
  appearance: {
    colors: {
      theme: ThemeProps;
    };
    typography: {
      useSystemFont: boolean;
    };
  };
  controls: {
    player: {
      resumePlayback: boolean;
    };
  };
  storage: {
    searchHistory: {
      isEnabled: boolean;
      data: string[];
    };
    imageCache: {
      maxSize: ImageCacheProps;
    };
    songCache: {
      maxSize: SongCacheProps;
    };
  };
  others: {};
  info: {};
}

const initialState: SettingsProps = {
  appearance: {
    colors: {
      theme: "dynamic",
    },
    typography: {
      useSystemFont: false,
    },
  },
  controls: {
    player: {
      resumePlayback: false,
    },
  },
  storage: {
    searchHistory: {
      isEnabled: true,
      data: [],
    },
    imageCache: {
      maxSize: "128mb",
    },
    songCache: {
      maxSize: "512mb",
    },
  },
  others: {},
  info: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    settheme: (state, actions: PayloadAction<ThemeProps>) => {
      state.appearance.colors.theme = actions.payload;
    },
    setuseSystemFont: (state, actions: PayloadAction<boolean>) => {
      state.appearance.typography.useSystemFont = actions.payload;
    },
    setresumePlayback: (state, actions: PayloadAction<boolean>) => {
      state.controls.player.resumePlayback = actions.payload;
    },
    setsearchHistoryEnabled: (state, actions: PayloadAction<boolean>) => {
      state.storage.searchHistory.isEnabled = actions.payload;
    },
    setsearchHistoryData: (state, actions: PayloadAction<string[]>) => {
      state.storage.searchHistory.data = actions.payload;
    },
    setmaxImageCacheSize: (state, actions: PayloadAction<ImageCacheProps>) => {
      state.storage.imageCache.maxSize = actions.payload;
    },
    setmaxSongCacheSize: (state, actions: PayloadAction<SongCacheProps>) => {
      state.storage.songCache.maxSize = actions.payload;
    },
  },
});

export const {
  settheme,
  setuseSystemFont,
  setresumePlayback,
  setmaxSongCacheSize,
  setmaxImageCacheSize,
  setsearchHistoryData,
  setsearchHistoryEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
