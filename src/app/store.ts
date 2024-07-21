import trackSlice from "@/features/track/trackSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "toot",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, trackSlice);

export const store = configureStore({
  reducer: { activeTrack: persistReducer(persistConfig, trackSlice) },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
