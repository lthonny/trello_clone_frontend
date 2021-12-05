export enum IColumns {
  'To Do',
  'In Progress',
  'Coded',
  'Testing',
  'Done'
}

export interface IDialogData {
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
  },
  users: any
}
