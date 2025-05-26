import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tr';
  currentLang = 'en';
  
  constructor(private translate: TranslateService) {
    // Register available languages
    translate.addLangs(['en', 'ar']);
    
    // Set default language
    translate.setDefaultLang('en');
    
    // Use browser language if available, otherwise use English
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
    this.currentLang = translate.currentLang;
  }
  
  ngOnInit() {
    // Initialize any additional setup here
  }
  
  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    
    // Set text direction for RTL language (Arabic)
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
}
