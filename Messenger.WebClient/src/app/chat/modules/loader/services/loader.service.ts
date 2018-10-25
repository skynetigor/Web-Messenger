import { Subject, Observable, ReplaySubject } from "rxjs";

export class LoaderService {
    private loadingSubject$ = new ReplaySubject<boolean | string>(null);

    constructor() {
      this.loadingSubject$.next(null);
    }
  
    get loadingMessage$() {
      return this.loadingSubject$.asObservable();
    }
  
    showLoader(message?: string) {
      const messageOrTrue = message ? message : true;
  
      this.loadingSubject$.next(messageOrTrue);
    }
  
    hideLoader() {
      this.loadingSubject$.next(null);
    }
  
    useLoader<T>(obs: Observable<T>, message?: string): Observable<T> {
      this.showLoader(message);
      const subject = new Subject<T>();
      const subscription = obs.subscribe(value => {
        this.hideLoader();
        subscription.unsubscribe();
        subject.next(value);
      }, err => {
        this.hideLoader();
        subscription.unsubscribe();
        subject.error(err);
      });
  
      return subject.asObservable();
    }
}