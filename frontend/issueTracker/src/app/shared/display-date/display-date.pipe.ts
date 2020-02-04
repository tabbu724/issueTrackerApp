import { Pipe,PipeTransform } from "@angular/core";
@Pipe(
    {
        name:'displayDate'
    }
)

export class displayDate implements PipeTransform{
    transform(inputDate:string):string{
        let formattedDate = new Date(inputDate).toDateString()
    let formattedTime = new Date(inputDate).toLocaleTimeString()
    let displayDate = `${formattedDate} , ${formattedTime}` 
    return displayDate
    }
}