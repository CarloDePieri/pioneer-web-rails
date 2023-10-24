import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants"

import storage from "redux-persist/lib/storage"
import undoable, { excludeAction } from "redux-undo"
import galleryReducer from "../features/gallery/gallerySlice"
import advancedGalleryReducer from "../features/game/advanced/advancedSlice"
import gameStateReducer from "../features/game/gameSlice"
import themeReducer from "../features/theme/themeSlice"
import settingsReducer from "../features/settings/settingsSlice"
import { isInNewRoundGroup } from "./groupActions"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    gameState: undoable(gameStateReducer, {
      limit: 10, // set a limit for the size of the history
      groupBy: (action, currentState, _) => {
        // group together consecutive NEW_ROUND, DEAL|DEAL_SECRETS state
        if (isInNewRoundGroup(action, currentState)) {
          return "NEW_ROUND_GROUP"
        }
        return null
      },
      filter: excludeAction(["gameState/pick", "gameState/unpick"]),
    }),
    interface: combineReducers({
      theme: themeReducer,
      gallery: galleryReducer,
      advancedGallery: advancedGalleryReducer,
    }),
    settings: settingsReducer,
  }),
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // See https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// noinspection SpellCheckingInspection
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
