import {ServiceRepositoryService} from "../service-repository/service-repository.service";
import {Microservice} from "../entities/microservice";

export class MockServiceRepositoryService extends ServiceRepositoryService {
    
    public getMicroserviceById(id: string): Microservice{
        let service: Microservice =  new Microservice("mock", "mock", "someHash");
        service.id = id;
        return service;
    }
}