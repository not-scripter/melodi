import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

export type FavMusicsProps = Track[];
export type FavPlaylistsProps = object[];
export type FavArtistsProps = object[];
export type FavAlbumsProps = object[];

export interface SettingsProps {
  musics: FavMusicsProps;
  playlists: FavPlaylistsProps;
  artists: FavArtistsProps;
  albums: FavAlbumsProps;
}

const initialState: SettingsProps = {
  musics: [],
  playlists: [],
  artists: [],
  albums: [],
};

export const favSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavMusics: ({ musics }, { payload }: PayloadAction<FavMusicsProps>) => {
      musics = [...musics, payload];
    },
    removeFavMusics: (
      { musics },
      { payload }: PayloadAction<FavMusicsProps>,
    ) => {
      musics = [musics.filter((item) => item !== payload)];
    },
  },
});

export const { addFavMusics } = favSlice.actions;

export default favSlice.reducer;
