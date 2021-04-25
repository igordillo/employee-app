import { Component, OnInit } from '@angular/core';
import { DEFAULT_LANG } from '@core/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public DEFAULT_LANG = DEFAULT_LANG;

  public langs = [
    {
      name: 'English',
      code: DEFAULT_LANG,
    },
    {
      name: 'Español',
      code: 'es',
    },
  ];

  constructor(public readonly translate: TranslateService) {}

  ngOnInit(): void {}

  onChangeLang(lang: string): void {
   this.translate.use(lang);
  }
}
