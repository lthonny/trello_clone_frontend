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

export interface IBoard {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date
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
  archive: boolean,
  Users?: [
    {
      id: number,
      name: string,
      email: string
    }
  ]
}

export interface IResAllTasks {
  id: number,
  tasks: ITask[],
  title: string
}

export interface ICreateTask {
  title: string,
  description: string,
  nameTaskList: string,
  board_id: number,
  order: number
}

export interface IArchive {
  id: number,
  title: string,
  description: string,
  board_id: number,
  nameTaskList: string,
  createdAt: Date,
  updatedAt: Date,
  order: number,
  archive: boolean
}

export interface DialogData {
  board: number,
  ownerStatus: boolean,
  invited: [{
    name: string,
    owner: boolean
  }],
  item: {
    id: any,
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

export interface IInvitedUsersName {
  owner: [
    {
      id: number,
      name: string,
      owner: boolean
    }
  ],
  names: [
    {
      id: number,
      name: string,
      owner: boolean
    }
  ]
}

export interface IInvitedUser {
  id: number,
  name: string,
  owner: boolean
}

export interface IOwner {
  userId: string | null,
  boardId: number
}

export interface IInitOwner {
  title?: any,
  userId: number,
  owner: boolean
}

export interface IResTransaction {
  id: number,
  task_id: number,
  column: string,
  name_user: string,
  board_id: number,
  transaction: string,
  createdAt: Date,
  updatedAt: Date
}

export interface ITransaction {
  id: number,
  data: string,
  transaction: string
}

export interface IResAssigned {
  allUsers: IUAssigned[],
  owner: {
    id: number,
    name: string
  },
  userAssigned: IUAssigned[]
}

export interface IUAssigned {
  id: number,
  name: string,
  task_id?: number,
  assigned?: boolean,
  exist?: string
}

export interface IAllArchiveTasks {
  idBoard: number,
  nameBoard: string,
  tasks?: IArchive[]
}

export interface IColumn {
  name: string,
  tasks: ITask[]
}

export interface IUpdateBoardTitle {
  id: number,
  title: string,
  owner: boolean
}

export interface IResInviteBoard {
  userId: number,
  board: IBoard
}

export interface IResBoardTasks {
  id: number | string,
  title: string,
  tasks: ITask[],
  error?: any
}
