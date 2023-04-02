import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFn(): void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent {
  constructor(private settingService: SettingsService) {}

  ngOnInit(): void {
    customInitFn();
  }
}
