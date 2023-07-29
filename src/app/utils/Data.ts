import {fabric} from "fabric";

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


  static filter(source : string) : any {
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
        return [fabricFilterBrightness];
      case 'Contrast':
        fabricFilterContrast = new fabric.Image.filters.Contrast({
          contrast: 0.5
        });
        return [fabricFilterContrast];
      case 'Saturation':
        fabricFilterSaturation = new fabric.Image.filters.Saturation({
          saturation: 0.2
        });
        return [fabricFilterSaturation];
      case 'Blur':
        fabricFilterBlur = new fabric.Image.filters.Blur({
          blur: 0.5
        });
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
        return [fabricFilterBrightness, fabricFilterContrast, fabricFilterHueRotation, fabricFilterSaturation];
      case 'Brooklyn':
        fabricFilterBrightness = new fabric.Image.filters.Brightness({
          brightness: 0.11
        });
        fabricFilterContrast = new fabric.Image.filters.Contrast({
          contrast: 0.09
        });
        return [fabricFilterBrightness, fabricFilterContrast];
      case 'Earlybird  ':
        fabricFilterContrast = new fabric.Image.filters.Contrast({
          contrast: 0.09
        });
        fabricFilterSepia = new fabric.Image.filters.Sepia({
          sepia: 0.02
        });
        return [fabricFilterContrast, fabricFilterSepia];
      case 'Gingham':
        fabricFilterBrightness = new fabric.Image.filters.Brightness({
          brightness: 0.105
        });
        fabricFilterHueRotation = new fabric.Image.filters.HueRotation({
          rotation: 350
        });
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
        return [fabricFilterBrightness, fabricFilterContrast, fabricFilterSaturation];
      case 'Lofi':
        fabricFilterContrast = new fabric.Image.filters.Contrast({
          contrast: 0.15
        });
        fabricFilterSaturation = new fabric.Image.filters.Saturation({
          saturation: 0.11
        });
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
        return [fabricFilterBrightness, fabricFilterContrast, fabricFilterGrayscale];
      default:
        return [];
    }
  }
}
