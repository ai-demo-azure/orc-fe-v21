import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';

export const API_BASE_URL = '';
declare const NG_API_URL: string;
declare const NG_PRODUCTION: boolean;
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: 'API_BASE_URL', useValue: NG_API_URL },
    { provide: 'IS_PROD', useValue: NG_PRODUCTION },

    importProvidersFrom(FormsModule),
    provideToastr(),
  ],
};
