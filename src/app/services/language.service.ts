import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$: Observable<string> = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Register available languages
    translate.addLangs(['en', 'ar']);
    
    // Set default language
    translate.setDefaultLang('en');
    
    // Use browser language if available, otherwise use English
    const browserLang = translate.getBrowserLang();
    const initialLang = browserLang?.match(/en|ar/) ? browserLang : 'en';
    this.switchLanguage(initialLang);
  }
  
  public switchLanguage(language: string): void {
    this.translate.use(language);
    this.currentLangSubject.next(language);
    
    // Set text direction for RTL language (Arabic)
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }
  
  public getCurrentLang(): string {
    return this.currentLangSubject.value;
  }
}
