export interface IUser {
  email: string,
  password: number | string
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string,
    name: string,
    email: string
  };
}

export interface ISingUp {
  name: string,
  email: string,
  password?: string
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
  board_id: number,
  description: string,
  nameTaskList: string,
  createdAt: Date,
  updatedAt: Date,
  order: number
  archive: boolean
}

export interface ICreateTask {
  title: string,
  description: string,
  nameTaskList: string,
  board_id: number,
  order: number
}

export interface IArchive {
  id: any,
  title: any,
  description: any,
  board_id: any,
  nameTaskList: any,
  createdAt: any,
  updatedAt: any,
  order: any,
  archive: any
}

export interface DialogData {
  item: {
    id: number,
    title: string,
    description: string,
    nameTaskList: string,
    board_id: number,
    createdAt: any,
    updatedAt: any,
    order: number,
    archive: boolean
  }
}

export interface IDescriptionUpdate {
  id: number,
  description: string
}

export interface IInviteKey {
  key: string,
}
