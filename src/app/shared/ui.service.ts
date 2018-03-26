import { Subject } from 'rxjs/Subject'

export class UIService {
  public loadingStateChanged = new Subject<boolean>()
}
