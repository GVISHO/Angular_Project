import { ApplicationConfig } from '@angular/core';
import { provideRouter,TitleStrategy } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppTitleStrategy } from './shared/services/title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },
  ],
};
