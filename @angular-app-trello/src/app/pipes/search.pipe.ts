import {Pipe, PipeTransform} from "@angular/core";
import {ITask} from "../interfaces";

@Pipe({
  name: 'searchTask'
})
export class SearchPipe implements PipeTransform {
  transform(tasks: ITask[], search = ''): ITask[] {
    if(!search.trim()) {
      return tasks;
    }
    return tasks.filter((task: any, index: number) => {
      // console.log('index', task.users[0].name);
      if(task.title === search) {
        // console.log('index')
        return task.title.toLowerCase().includes(search.toLowerCase());
      }

      // return task.users.forEach((user: any) => {
      //   if(user.name === search) {
      //     return task.title.toLowerCase().includes(search.toLowerCase());
      //   }
      // })
    })
  }
}
