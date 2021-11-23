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
      if(task.title === search) {
        return task.title.toLowerCase().includes(search.toLowerCase());
      }

      if(task.description === search) {
        return task.description.toLowerCase().includes(search.toLowerCase());
      }

      if(task.active) {
        console.log(task.active);

        if(task.active[0].name === search) {
          return task.active[0].name.toLowerCase().includes(search.toLowerCase());
        }
        if(task.active[0].email === search) {
          return task.active[0].email.toLowerCase().includes(search.toLowerCase());
        }
      }


      // if(task.active.name === search) {
      //   console.log('gg');
      //   return task.title.toLowerCase().includes(search.toLowerCase());
      // }

      // if(task.active.name === search) {
      //   console.log(task.active.name)
      //   // return task.active.name.toLowerCase().includes(search.toLowerCase());
      // }

      // if(task.active.email === search) {
      //   if(task.active.email) {
      //     return task.active.name.toLowerCase().includes(search.toLowerCase());
      //   }
      //   console.log(task.active.name)

      // }
    })
  }
}
