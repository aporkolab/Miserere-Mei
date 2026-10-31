import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { credentialsInterceptor } from '../app/service/jwt.interceptor';

/** Application-equivalent providers for component tests, with a mocked HTTP backend. */
export const testProviders: (Provider | EnvironmentProviders)[] = [
  // Accept any navigation so components that redirect (e.g. to /login) do not throw.
  provideRouter([{ path: '**', children: [] }]),
  provideHttpClient(withInterceptors([credentialsInterceptor])),
  provideHttpClientTesting(),
];
