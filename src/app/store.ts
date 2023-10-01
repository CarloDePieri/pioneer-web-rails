import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import gameStateReducer from "../features/game/gameSlice"
import undoable from "redux-undo"

import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  undoable(gameStateReducer, {
    limit: 10, // set a limit for the size of the history
  }),
)

export const store = configureStore({
  reducer: {
    gameState: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // See https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
