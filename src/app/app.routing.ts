import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children:[
      { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },          
      { path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } },
      { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
      { path: 'form-elements', loadChildren: './pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
      { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
      { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
      { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
      { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
      { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
      { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
      { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },  
      { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' }  },         
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
  // useHash: true
});