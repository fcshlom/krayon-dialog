import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from './dialogs/trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  // constructor(private dialog: DialogService){}
  constructor(private dialog: MatDialog) {}

  openTradeDialog() {
    // const dialogRef = this.dialog.open('150px', '350px', TradeDialogComponent);
    const dialogRef = this.dialog.open(TradeDialogComponent, {
      width: '550px',
      height: '441px'
    });
  
  }

}
