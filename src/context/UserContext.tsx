import React, { useReducer, useContext, createContext, Dispatch } from 'react';

interface State {
  user: string;
}

type Action = { type: 'USER'; user: string };

type SampleDispatch = Dispatch<Action>;

const UserStateContext = createContext<State | null>(null);
const UserDispatchContext = createContext<SampleDispatch | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      throw new Error('Unhandled action');
  }
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    user: 'false',
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useSampleState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error('Cannot find SampleProvider');
  return state;
}

export function useSampleDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider');
  return dispatch;
}
