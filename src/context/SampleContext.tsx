import React, { useReducer, useContext, createContext, Dispatch, useEffect, useState } from 'react';
import axios from 'axios';

export interface validateValues {
  username: string;
  password: string;
}

export interface initValues {
  initialValues: validateValues;
  onSubmit: any;
}

type State = {
  count: number;
  text: string;
  isGood: boolean;
  login: string;
};

type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'TOGGLE_GOOD' }
  | { type: 'LOGIN'; login: string };

type SampleDispatch = Dispatch<Action>;

const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);
// const [token, setToken] = useState('');

// 로그인에 맞는 애들 넣어주면 될듯
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count,
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood,
      };
    case 'LOGIN':
      return {
        ...state,
        login: action.login,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function SampleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hello',
    isGood: true,
    login: 'login',
  });
  return (
    <SampleStateContext.Provider value={state}>
      <SampleDispatchContext.Provider value={dispatch}>{children}</SampleDispatchContext.Provider>
    </SampleStateContext.Provider>
  );
}

export function useSampleState() {
  const state = useContext(SampleStateContext);
  if (!state) throw new Error('Cannot find SampleProvider');
  return state;
}

export function useSampleDispatch() {
  const dispatch = useContext(SampleDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider');
  return dispatch;
}

export function useJoin({ initialValues, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [token, setToken] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

  const handleAxiosLogin = async () => {
    try {
      const loadAxios = await axios.post(
        'http://15.164.62.156:8000/api/login/',
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // if (loadAxios.status === 200) {
      //   setLoginFail(false)
      //   localStorage.setItem('token', loadAxios.data.token)
      //   document.location.href = '/todolist/'
      // }
      console.log(loadAxios);
      setToken(loadAxios.data.token);
    } catch (error: any) {
      setLoginFail(true);
    }
  };

  const handleLogout = () => {
    setToken('');
  };

  useEffect(() => {
    if (submitting) {
      handleAxiosLogin();
      onSubmit(values);
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    submitting,
    loginFail,
    token,
    handleChange,
    handleSubmit,
    handleLogout,
  };
}
