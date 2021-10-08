export interface IUser {
  email: string,
  password: number | string
}

export interface IContactForm {
  email: string,
  text: string
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ISingUp {
  name: string,
  email: string,
  password: string
}

export interface ISingIn {
  email: string,
  password: string
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUpdateTask {
  id: string,
  title: string,
  text: string,
  status: boolean,
  updatedAt: string,
  user_id: any
}


export interface IBoard {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface ITask {
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
}
