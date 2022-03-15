export interface ISignInAction {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

export interface ISignUpAction {
  type: string;
  payload: {
    user: {
      email: string;
      name: string;
      password: string;
    };
    navigate: (arg: string) => void;
  };
}
