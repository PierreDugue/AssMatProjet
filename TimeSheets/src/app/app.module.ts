import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ManagePagePage } from '../pages/manage-page/manage-page';
import { TabsPage } from '../pages/tabs/tabs';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Storage } from '@ionic/storage';
import { sigPadComponent } from '../pages/home/sigPadComonent';
import { Dropbox } from '../providers/dropbox';
import { listDropBoxComponent } from '../pages/manage-page/listDropBoxComponent';
import { TestPage } from '../pages/test-page/test-page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManagePagePage,
    TabsPage,
    sigPadComponent,
    listDropBoxComponent,
    TestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ManagePagePage,
    TabsPage,
    sigPadComponent,
    listDropBoxComponent,
    TestPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
  
})
export class AppModule {}
