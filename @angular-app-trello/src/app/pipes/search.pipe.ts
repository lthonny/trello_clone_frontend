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
    return tasks.filter((task: any) => {
      console.log(task)
      if(task.title === search) {
        return task.title.toLowerCase().includes(search.toLowerCase());
      }
    })
  }
}
