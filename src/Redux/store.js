import { configureStore, combineReducers, /*applyMiddleware */} from "@reduxjs/toolkit";
//import {thunk} from "redux-thunk";
import userSlice from "./userRedux";
import productSlice from "./productRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
//const middleware = applyMiddleware(thunk);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
