import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string | undefined;
  @Input() disabled: boolean = false;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.action.emit();
    }
  }
}
