import {Pipe, PipeTransform} from "@angular/core";
import {ITask, ITaskUser} from "../../interfaces";

@Pipe({
  name: 'searchTask'
})
export class SearchPipe implements PipeTransform {
  transform(tasks: ITask[], search = ''): any {
    const normalizedSearchTerm = search.toLowerCase().trim();
    if (!normalizedSearchTerm) {
      return tasks;
    }

    return tasks.filter((task: ITask) => {
      const taskTitleHasTerm = task.title.toLowerCase().includes(normalizedSearchTerm);
      let taskUsersHaveTerm = false;
      if(task.Users){
        taskUsersHaveTerm = task.Users.findIndex((user: ITaskUser) => {
          return user.email.toLowerCase().includes(normalizedSearchTerm) || user.name.toLowerCase().includes(normalizedSearchTerm)
        }) !== -1
      }

      return taskTitleHasTerm || taskUsersHaveTerm;
    })
  }
}
