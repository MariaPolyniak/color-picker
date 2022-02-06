import { Injectable } from '@angular/core';

import { Color } from "./color.model";

import { colors } from './colors.mock';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  getAvailableColors(): Color[] {
    return colors;
  }
}
