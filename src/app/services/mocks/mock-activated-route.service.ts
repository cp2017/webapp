import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

export class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = Observable.of({hash: "mockHash"});
    }
}