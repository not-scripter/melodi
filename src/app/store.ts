import trackSlice from "@/features/slices/trackSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const persistConfig = {
  key: "toot",
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, trackSlice);

export const store = configureStore({
  reducer: { track: persistedReducer },
});

// export const store = configureStore({
//   reducer: { activeTrack: persistedReducer },
// });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
