import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'searchTask'
})
export class SearchPipe implements PipeTransform {
  transform(tasks: any, search = ''): any {
    if(!search.trim()) {
      return tasks;
    }

    return tasks.filter((task: any) => {
      return task.title.toLowerCase().includes(search.toLowerCase());
    })
  }
}
