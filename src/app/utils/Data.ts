import {fabric} from "fabric";

export interface FilterType {
  name: string;
  minValue: number;
  maxValue: number;
  defautValue: number;
  step: number;
}

export class Data {

  static getFilterList() : string[] {
    return [
      'Grayscale',
      'Sepia',
      'Brightness',
      'Contrast',
      'Saturation',
      'Emboss',
      'Sharpen',
      '1977',
      'Aden',
      'Brooklyn',
      'Earlybird  ',
      'Gingham',
      'Hudson',
      'Lofi',
      'Reyes',
      'Toaster',
      'Willow'
    ];
  }

  static getFilterTypeList() {
    let Blur : FilterType = {
      name: 'Blur',
      minValue: 0,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    };
    let Brightness : FilterType = {
      name: 'Brightness',
      minValue: -1,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }
    let Contrast : FilterType = {
      name: 'Contrast',
      minValue: -1,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }
    let Saturation : FilterType = {
      name: 'Saturation',
      minValue: -1,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }
    let HueRotate : FilterType = {
      name: 'Hue Rotate en développement',
      minValue: 0,
      maxValue: 360,
      defautValue: 0,
      step: 1
    }
    let Invert : FilterType = {
      name: 'Invert en développement',
      minValue: 0,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }
    let Opacity : FilterType = {
      name: 'Opacity en développement',
      minValue: 0,
      maxValue: 1,
      defautValue: 1,
      step: 0.1
    }
    let Grayscale : FilterType = {
      name: 'Grayscale en développement',
      minValue: 0,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }
    let Sepia : FilterType = {
      name: 'Sepia en développement',
      minValue: -1,
      maxValue: 1,
      defautValue: 0,
      step: 0.1
    }

    return [
      Blur,
      Brightness,
      Contrast,
      Saturation,
      HueRotate,
      Invert,
      Opacity,
      Grayscale,
      Sepia
    ]
  }


  static filter(source : string, filterType: FilterType[]) : any {
    if (source === '') {

      let fabricFilterBlur = new fabric.Image.filters.Blur({
        blur: filterType[0].defautValue
      });
      let fabricFilterBrightness = new fabric.Image.filters.Brightness({
        brightness: filterType[1].defautValue
      });
      let fabricFilterContrast = new fabric.Image.filters.Contrast({
        contrast: filterType[2].defautValue
      });
      let fabricFilterSaturation = new fabric.Image.filters.Saturation({
        saturation: filterType[3].defautValue
      });
      let fabricFilterHueRotation = new fabric.Image.filters.HueRotation({
        rotation: filterType[4].defautValue
      });
      let fabricFilterInvert = new fabric.Image.filters.Invert({
        invert: filterType[5].defautValue
      });
/*      let fabricFilterOpacity = new fabric.Image.filters.Opacity({
        opacity: filterType[6].defautValue
      });*/

      let fabricFilterGrayscale = new fabric.Image.filters.Grayscale({
        grayscale: filterType[7].defautValue
      });
      let fabricFilterSepia = new fabric.Image.filters.Sepia({
        sepia: filterType[8].defautValue
      });

      return [
        fabricFilterBlur,
        fabricFilterBrightness,
        fabricFilterContrast,
        fabricFilterSaturation,
        // fabricFilterHueRotation,
        // fabricFilterInvert,
        // fabricFilterGrayscale,
        // fabricFilterSepia
      ];

    }
    else {
      filterType[0].defautValue = 0;
      filterType[1].defautValue = 0;
      filterType[2].defautValue = 0;
      filterType[3].defautValue = 0;
      filterType[4].defautValue = 0;
      filterType[5].defautValue = 0;
      filterType[6].defautValue = 0;
      filterType[7].defautValue = 0;
      filterType[8].defautValue = 0;

      let fabricFilterGrayscale : any;
      let fabricFilterSepia : any;
      let fabricFilterBrightness : any;
      let fabricFilterContrast : any;
      let fabricFilterSaturation : any;
      let fabricFilterBlur : any;
      let fabricFilterConvolut : any;
      let fabricFilterHueRotation : any;
      switch (source) {
        case 'Grayscale':
          fabricFilterGrayscale = new fabric.Image.filters.Grayscale();
          return [fabricFilterGrayscale];
          break;
        case 'Sepia':
          fabricFilterSepia = new fabric.Image.filters.Sepia();
          return [fabricFilterSepia];
          break;
        case 'Brightness':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.2
          });
          filterType[1].defautValue = 0.2;
          return [fabricFilterBrightness];
        case 'Contrast':
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.5
          });
          filterType[2].defautValue = 0.5;
          return [fabricFilterContrast];
        case 'Saturation':
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.2
          });
          filterType[3].defautValue = 0.2;
          return [fabricFilterSaturation];
        case 'Blur':
          fabricFilterBlur = new fabric.Image.filters.Blur({
            blur: 0.5
          });
          filterType[0].defautValue = 0.5;
          return [fabricFilterBlur];
        case 'Emboss':
          fabricFilterConvolut = new fabric.Image.filters.Convolute({
            matrix: [ 1,   1,  1,
              1, 0.7, -1,
              -1,  -1, -1 ]
          });
          return [fabricFilterConvolut];
        case 'Sharpen':
          fabricFilterConvolut = new fabric.Image.filters.Convolute({
            matrix: [  0, -1,  0,
              -1,  5, -1,
              0, -1,  0 ]
          });
          return [fabricFilterConvolut];
        case '1977':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.11
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.11
          });
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.13
          });
          filterType[1].defautValue = 0.11;
          filterType[2].defautValue = 0.11;
          filterType[3].defautValue = 0.13;
          return [fabricFilterBrightness, fabricFilterContrast, fabricFilterSaturation];
        case 'Aden':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.12
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.09
          });
          fabricFilterHueRotation = new fabric.Image.filters.HueRotation({
            rotation: 20
          });
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.085
          });
          filterType[1].defautValue = 0.12;
          filterType[2].defautValue = 0.09;
          filterType[4].defautValue = 20;
          filterType[3].defautValue = 0.085;
          return [fabricFilterBrightness, fabricFilterContrast, fabricFilterHueRotation, fabricFilterSaturation];
        case 'Brooklyn':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.11
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.09
          });
          filterType[1].defautValue = 0.11;
          filterType[2].defautValue = 0.09;
          return [fabricFilterBrightness, fabricFilterContrast];
        case 'Earlybird  ':
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.09
          });
          fabricFilterSepia = new fabric.Image.filters.Sepia({
            sepia: 0.02
          });
          filterType[2].defautValue = 0.09;
          filterType[8].defautValue = 0.02;
          return [fabricFilterContrast, fabricFilterSepia];
        case 'Gingham':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.105
          });
          fabricFilterHueRotation = new fabric.Image.filters.HueRotation({
            rotation: 350
          });
          filterType[1].defautValue = 0.105;
          filterType[4].defautValue = 350;
          return [fabricFilterBrightness, fabricFilterHueRotation];
        case 'Hudson':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.12
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.09
          });
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.11
          });
          filterType[1].defautValue = 0.12;
          filterType[2].defautValue = 0.09;
          filterType[3].defautValue = 0.11;
          return [fabricFilterBrightness, fabricFilterContrast, fabricFilterSaturation];
        case 'Lofi':
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.15
          });
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.11
          });
          filterType[2].defautValue = 0.15;
          filterType[3].defautValue = 0.11;
          return [fabricFilterContrast, fabricFilterSaturation];
        case 'Reyes':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.11
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.085
          });
          fabricFilterSaturation = new fabric.Image.filters.Saturation({
            saturation: 0.075
          });
          fabricFilterSepia = new fabric.Image.filters.Sepia({
            sepia: 0.022
          });
          filterType[1].defautValue = 0.11;
          filterType[2].defautValue = 0.085;
          filterType[3].defautValue = 0.075;
          filterType[8].defautValue = 0.022;
          return [fabricFilterBrightness, fabricFilterContrast, fabricFilterSaturation, fabricFilterSepia];
        case 'Toaster':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.09
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.150
          })
          return [fabricFilterBrightness, fabricFilterContrast];
        case 'Willow ':
          fabricFilterBrightness = new fabric.Image.filters.Brightness({
            brightness: 0.09
          });
          fabricFilterContrast = new fabric.Image.filters.Contrast({
            contrast: 0.095
          });
          fabricFilterGrayscale = new fabric.Image.filters.Grayscale({
            grayscale: 0.05
          });
          filterType[1].defautValue = 0.09;
          filterType[2].defautValue = 0.095;
          filterType[4].defautValue = 0.05;
          return [fabricFilterBrightness, fabricFilterContrast, fabricFilterGrayscale];
        default:
          return [];
      }
    }
  }
}
