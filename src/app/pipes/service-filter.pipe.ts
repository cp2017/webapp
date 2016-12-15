import { Pipe, PipeTransform } from '@angular/core';
import {Microservice} from "../services/entities/microservice";

@Pipe({name: 'serviceFilter'})
export class ServiceFilterPipe implements PipeTransform {
    transform(value: any, args: string): any{
        let filterText = args;
        let services : Microservice[] = value;
        return filterText ? services.filter(service => {
            filterText = filterText.toLowerCase();
            if(service.name && service.name.toLowerCase().indexOf(filterText) >= 0){
                return true;
            }
            if(service.description && service.description.toLowerCase().indexOf(filterText) >= 0){
                return true;
            }
            return false;             
        }):services;
    }
}