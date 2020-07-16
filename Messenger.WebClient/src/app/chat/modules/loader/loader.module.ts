import { NgModule } from "@angular/core";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [LoaderComponent],
    imports: [CommonModule, FormsModule],
    providers: [LoaderService],
    exports: [LoaderComponent]
})

export class LoaderModule {

}