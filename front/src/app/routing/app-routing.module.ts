import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../ui/home';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { CustomComponent } from '../ui/modes/custom';
import { SpontzComponent } from '../ui/modes/spontz';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: ':aesword',
		component: CustomComponent
	},
	{
		path: 'spontz/:aesword',
		component: SpontzComponent
	}
];

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatMenuModule,
		RouterModule.forRoot(routes,
			{
				useHash: true,

				scrollPositionRestoration: 'enabled',
				relativeLinkResolution: 'legacy'
			}
		)
	],
	exports: [RouterModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
