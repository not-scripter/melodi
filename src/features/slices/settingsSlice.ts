import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ThemeProps = "system" | "dynamic" | "pureBlack";
export type ImageCacheProps = "128mb" | "256mb";
export type SongCacheProps = "512mb" | "1gb";

export type AppearanceProps = {
  colors: {
    theme: ThemeProps;
  };
  typography: {
    useSystemFont: boolean;
  };
};
export type ControlsProps = {
  player: {
    resumePlayback: boolean;
  };
};
export type StorageProps = {
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

export interface SettingsProps {
  appearance: AppearanceProps;
  controls: ControlsProps;
  storage: StorageProps;
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
    setappearance: (state, { payload }: PayloadAction<AppearanceProps>) => {
      state.appearance = {
        colors: {
          theme: payload.colors.theme,
        },
        typography: {
          useSystemFont: payload.typography.useSystemFont,
        },
      };
    },
    setcontrols: (state, { payload }: PayloadAction<ControlsProps>) => {
      state.controls = {
        player: {
          resumePlayback: payload.player.resumePlayback,
        },
      };
    },
    setstorage: (state, { payload }: PayloadAction<StorageProps>) => {
      state.storage = {
        searchHistory: {
          isEnabled: payload.searchHistory.isEnabled,
          data: payload.searchHistory.data,
        },
        imageCache: {
          maxSize: payload.imageCache.maxSize,
        },
        songCache: {
          maxSize: payload.songCache.maxSize,
        },
      };
    },
    //   settheme: (state, actions: payloadaction<themeprops>) => {
    //     state.appearance.colors.theme = actions.payload;
    //   },
    //   setusesystemfont: (state, actions: payloadaction<boolean>) => {
    //     state.appearance.typography.usesystemfont = actions.payload;
    //   },
    //   setresumeplayback: (state, actions: payloadaction<boolean>) => {
    //     state.controls.player.resumeplayback = actions.payload;
    //   },
    //   setsearchhistoryenabled: (state, actions: payloadaction<boolean>) => {
    //     state.storage.searchhistory.isenabled = actions.payload;
    //   },
    //   setsearchhistorydata: (state, actions: payloadaction<string[]>) => {
    //     state.storage.searchhistory.data = actions.payload;
    //   },
    //   setmaximagecachesize: (state, actions: payloadaction<imagecacheprops>) => {
    //     state.storage.imagecache.maxsize = actions.payload;
    //   },
    //   setmaxSongCacheSize: (state, actions: PayloadAction<SongCacheProps>) => {
    //     state.storage.songCache.maxSize = actions.payload;
    //   },
  },
});

export const {
  setappearance,
  setcontrols,
  setstorage,
  // settheme,
  // setuseSystemFont,
  // setresumePlayback,
  // setmaxSongCacheSize,
  // setmaxImageCacheSize,
  // setsearchHistoryData,
  // setsearchHistoryEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
