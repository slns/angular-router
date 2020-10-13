import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';

@Injectable()
export class CustomPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data['preload']) {
      return load();
    } else {
      of(null);
    }
  }
}
