import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './ui/home';
import { WordsService } from './infra';
import { HttpClientModule } from '@angular/common/http';
import { CustomComponent } from './ui/modes/custom';
import { WordGridComponent } from './ui/word-grid';
import { KeyboardComponent } from './ui/keyboard';
import { DialogInfoComponent } from './ui/dialog/dialog-info';
import { DialogWinComponent } from './ui/dialog/dialog-win';
import { FormsModule } from '@angular/forms';
import { SpontzComponent } from './ui/modes/spontz';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CustomComponent,
		SpontzComponent,
		WordGridComponent,
		KeyboardComponent,
		DialogInfoComponent,
		DialogWinComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatToolbarModule,
		MatToolbarModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatSidenavModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatTooltipModule,
		MatDialogModule,
		FormsModule
	],
	providers: [
		WordsService
	],
	entryComponents: [
		DialogInfoComponent,
		DialogWinComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
