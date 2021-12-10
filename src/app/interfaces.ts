export interface IBoard {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date
}

export interface IResBoard {
  board_id: number,
  title: string
  owner: boolean,
  users: [{ id: number, name: string, owner: boolean }]
  tasks: ITask[],
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
  Users?: ITaskUser[]
}

export interface ITaskUser {
  id: number;
  name: string;
  email: string;
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

export interface IDescriptionUpdate {
  id: number,
  description: string
}

export interface IInvitedUser {
  id: number,
  name: string,
  owner: boolean
}

export interface IHistoryTask {
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

export interface IColumn {
  name: string,
  tasks: ITask[]
}

export interface ITaskPosition {
  topTaskId: number | null;
  currentTaskId: number | null;
  bottomTaskId: number | null;
}
