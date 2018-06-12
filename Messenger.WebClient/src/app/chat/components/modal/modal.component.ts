import { Component, AfterViewChecked, EventEmitter, Input, Output, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.css']
})
export class ModalComponent implements OnInit {
    @ViewChild('textbox') private textbox: ElementRef;
    @Output() onClose = new EventEmitter();
    @Output() onCreate = new EventEmitter<string>();
    public name: string;

    public close() {
        this.onClose.emit();
    }

    ngOnInit(): void {
        this.textbox.nativeElement.focus();
    }

    public enter(event: any) {
        if (event.code === 'Enter') {
            this.create();
        }
    }

    public create() {
        this.onCreate.emit(this.name);
        this.onClose.emit(this.name);
    }
}
