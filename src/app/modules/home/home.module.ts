import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from "../../shared/components/shared.module";
import { MatDialogModule } from '@angular/material/dialog';
import { TradeDialogComponent } from './dialogs/trade-dialog/trade-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [
        HomeComponent,
        TradeDialogComponent
    ],
    imports: [
      SharedModule,
      MatDialogModule,
      HomeRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatIconModule,
    ],
    exports: [HomeComponent]
})
export class HomeModule { }
