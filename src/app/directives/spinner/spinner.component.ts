import {Component, Input} from "@angular/core";
@Component({
  selector: 'spinner',
  styleUrls: ['./loading.css'],
  template: `
    <div class="spinner-background" *ngIf="loading">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input('active') loading: string;
}
