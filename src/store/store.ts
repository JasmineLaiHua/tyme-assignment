import { createStore, combineReducers } from 'redux';
// import { productReducer } from '@/store/reducers/productReducer';

const rootReducer = combineReducers({
    // product: productReducer,
});

export const store = createStore(
    rootReducer,
);

export type RootState = ReturnType<typeof rootReducer>;