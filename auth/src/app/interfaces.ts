export interface IUser {
  email: string,
  password: number | string
}

export interface ITask {
  id?: string,
  title?: string,
  text?: string,
  status?: boolean,
  createdAt?: Date,
  updatedAt?: Date
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
