// angular
import { Component, OnInit } from '@angular/core';

// angular redux
import { Store } from '@ngrx/store';
import { loadDishes } from './modules/dish/dish.action';
import { State } from './modules/dish/dish.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Restaurant App';

  get darkTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
  get auth(): boolean {
    return !!localStorage.getItem('jwt');
  }
  constructor(private store: Store<State>) {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light');
  }

  ngOnInit(): void {
    if (this.auth) {
      this.store.dispatch(loadDishes());
    }
  }
  onThemeChange(checked: boolean) {
    if (checked) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
