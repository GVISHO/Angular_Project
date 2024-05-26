import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter,TitleStrategy } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppTitleStrategy } from './shared/services/title-strategy';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { StorageKeys } from './shared/enums';
import { EVERREST_API_URL } from './shared/consts';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem(StorageKeys.AccessToken),
          allowedDomains: [EVERREST_API_URL],
        },
      }),
    ),
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },
  ],
};
