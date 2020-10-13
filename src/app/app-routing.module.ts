import { ChatComponent } from './chat/chat.component';
import { CustomPreloadStrategy } from './services/custom-preloding.strategy';
import { CanLoadAuthGuard } from './services/can-load-auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
  NoPreloading,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard],
    data: {
      preload: false,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: 'chat',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //  preloadingStrategy: NoPreloading // Default
      // preloadingStrategy: PreloadAllModules, // Only pre load the laizing modules without canLoad
      preloadingStrategy: CustomPreloadStrategy,
      // enableTracing: false,
      // useHash: true,
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => urlSerializer.parse('/page-not-found'),
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadStrategy],
})
export class AppRoutingModule {}
