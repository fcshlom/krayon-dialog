import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { StopPropagationDirective } from '../directives/stop-propagation/stop-propagation.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    StopPropagationDirective
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    StopPropagationDirective,
    CommonModule
  ],
})
export class SharedModule {}
