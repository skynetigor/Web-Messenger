export class CustomTimer {
    private timer: any;
    constructor(delay: number, private callBack: () => void) {
        this.timer = setTimeout(callBack, delay);
    }

    public extendDelay(newDelay: number) {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.callBack, newDelay);
    }

    public stop() {
        clearTimeout(this.timer);
    }
}
