import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingScreenInterceptor } from './core/interceptors/loading-screen.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'



export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'/i18n/','.json')
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loadingScreenInterceptor])),
  importProvidersFrom(BrowserModule,NgxSpinnerModule),
  provideAnimations(),
  provideToastr(),
  importProvidersFrom(TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader:{
      provide:TranslateLoader,
      useFactory:HttpLoaderFactory,
      deps:[HttpClient]
    }
}))

  ]
};
