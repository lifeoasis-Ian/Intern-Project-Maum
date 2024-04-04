import {AppDispatch, RootState, store} from "../store";
import {AsyncThunk} from "@reduxjs/toolkit";

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export const asyncDispatch = async <Returned, Data = void>(
  asyncFunc: AsyncThunk<Returned, Data, AsyncThunkConfig>,
  args?: Data,
) => {
  const result = await store.dispatch(asyncFunc(args as Data));

  if (asyncFunc.fulfilled.match(result)) {
    return {
      payload: result.payload,
      error: null,
      skip: false,
    };
  } else if (asyncFunc.rejected.match(result) && result.meta.condition) {
    return {
      payload: null,
      skip: true,
      error: null,
    };
  } else {
    if (result.error.name) {
      return {
        payload: null,
        error: new Error("Error"),
        skip: false,
      };
    } else {
      return {
        payload: null,
        error: result.error,
        skip: false,
      };
    }
  }
};
