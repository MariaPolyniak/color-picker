import { render, fireEvent, getByTestId, getByText, queryByTestId, queryByText } from '@testing-library/angular';

import { ColorPickerComponent } from './color-picker.component';

import { ColorPickerService } from "./color-picker.service";

describe('ColorPickerComponent', () => {
  it('should render available colors', async () => {
    const [ firstColor, secondColor ] = [ 'rgb(239, 153, 153)', 'rgb(207, 147, 218)' ];

    const { getAllByTestId } = await setup([ firstColor, secondColor ]);

    const colorOptionEls = getAllByTestId('colorOption');

    expect(colorOptionEls.length).toBe(2);
    expect(colorOptionEls[0].style.backgroundColor).toBe(firstColor);
    expect(colorOptionEls[1].style.backgroundColor).toBe(secondColor);
  });

  it('should render text indicating that color option is not selected', async () => {
    const { getByText } = await setup();

    expect(getByText('No color selected...')).toBeInTheDocument();
  });

  it('should not render the selected option if the option was not selected', async () => {
    const { queryByTestId } = await setup([ 'rgb(239, 153, 153)' ]);

    expect(queryByTestId('selectedColorOption')).toBeNull();
  });

  it('should render the selected option if the option was selected', async () => {
    const availableColor = 'rgb(239, 153, 153)';

    const selectedColorOptionEl = await selectColorOption(availableColor);

    expect(selectedColorOptionEl).toBeInTheDocument();
    expect(selectedColorOptionEl.style.backgroundColor).toBe(availableColor);
    expect(queryByText(selectedColorOptionEl, 'No color selected...')).toBeNull();
  });

  it('should render the white icon if the selected color option is not white', async () => {
    const availableColorRGB = [ 239, 153, 153 ];

    const selectedColorOptionEl = await selectColorOption(convertToHex(availableColorRGB));

    expect(selectedColorOptionEl.style.color).toBe('rgb(255, 255, 255)');
  })

  it('should render the gray icon if the selected color option is white', async () => {
    const availableColorRGB = [ 255, 255, 255 ];

    const selectedColorOptionEl = await selectColorOption(convertToHex(availableColorRGB));

    expect(selectedColorOptionEl.style.color).toBe('rgb(102, 102, 102)');
  })
})

function setup(colors: string[] = []) {
  return render(ColorPickerComponent, {
    declarations: [ColorPickerComponent],
    providers: [
      {
        provide: ColorPickerService,
        useValue: jasmine.createSpyObj<ColorPickerService>({
          getAvailableColors: colors.map(color => ({ colorID: color, colorName: color }))
        })
      }
    ]
  });
}

async function selectColorOption(availableColor: string) {
  const { getByTestId } = await setup([availableColor]);

  fireEvent.click(getByTestId('colorOption'));

  return getByTestId('selectedColorOption');
}

function convertToHex(rgb: number[]) {
  const [r, g, b] = rgb;

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
