import { Component } from '@angular/core';

import { ColorPickerService } from "./color-picker.service";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  readonly availableColors = this.colorPickerService.getAvailableColors();

  selectedColorID?: string;
  checkIconColorID?: string;

  constructor(private colorPickerService: ColorPickerService) {}

  selectColor(colorID: string) {
    this.selectedColorID = colorID;

    this.checkIconColorID = this.selectedColorID === '#ffffff' ? '#666666' : '#ffffff';
  }
}
