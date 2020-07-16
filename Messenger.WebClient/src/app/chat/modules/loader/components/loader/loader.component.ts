import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { isNullOrUndefined } from "util";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {

    showLoader: boolean;
    message: string;
    private subscriptions: Subscription[] = [];

    constructor(private service: LoaderService) { }

    ngOnInit() {
        this.subscriptions.push(this.service.loadingMessage$.subscribe(t => {
            if (isNullOrUndefined(t)) {
                this.showLoader = false;
            } else if (typeof t === 'boolean') {
                this.showLoader = t;
            } else if (typeof t === 'string') {
                this.showLoader = true;
                this.message = t;
            }
        }));
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach(t => t.unsubscribe());
    }
}