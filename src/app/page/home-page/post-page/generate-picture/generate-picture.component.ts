import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fabric} from "fabric";
import html2canvas from "html2canvas";
import {PostModelService} from "../../../../viewModel/post-model.service";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-generate-picture',
  templateUrl: './generate-picture.component.html',
  styleUrls: ['./generate-picture.component.scss']
})
export class GeneratePictureComponent implements AfterViewInit, OnInit, OnDestroy {

  @Output() public goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isPictureChoose : boolean = false;

  public tabSelector: number = 0;

  public filters: string[] = [
    'grayscale',
    'sepia',
    'invert',
    'brightness',
    'contrast',
    'saturation',
    'emboss',
    'sharpen',
    'vintage',
    'cool',
    'warm',
    'black-and-white',
  ];

  public canvas!: fabric.Canvas;
  public image!: fabric.Image;

  public maxHeight: number = 500;
  public maxWidth: number = 500;

  public ratio : number = 1;
  private finaleImage: any;

  public imageBase64 : any;
  public filterButtonHeight: number = 0;

  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;
  @ViewChild('filterButton', { static: false }) filterButton!: ElementRef;
  @ViewChild('toolbar', { static: false }) toolbar!: ElementRef;
  @ViewChild('tabs', { static: false }) tabs!: ElementRef;
  constructor(
    private postModelService: PostModelService,
  ) {
  }

  ngAfterViewInit() {

    this.maxHeight = window.innerHeight - this.tabs.nativeElement.offsetHeight - this.toolbar.nativeElement.offsetHeight;
    this.maxWidth = this.tabs.nativeElement.offsetWidth;

    this.filterButtonHeight = this.tabs.nativeElement.offsetHeight *3;

    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
      isDrawingMode: false,
      skipTargetFind: true,
      defaultCursor: 'default',
      hoverCursor: 'default',
      moveCursor: 'default',
      height: this.maxHeight - this.filterButtonHeight,
      width: this.maxWidth,
      perPixelTargetFind: false,
      fireRightClick: false,
      fireMiddleClick: false,
      stopContextMenu: true
    });

    this.initializeCamera();
  }

  ngOnInit(): void {
    history.pushState({ action: 'customAction' }, '', window.location.href);
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState(event: PopStateEvent) {
    this.returnPostPage();
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.handlePopState);
  }

  returnPostPage() : void {
    this.reinit();
    this.goBack.emit(true)
  }

  reinit() {
    this.isPictureChoose = false;
    this.tabSelector = 0;
    this.canvas.clear();
    this.canvas.renderAll();
    this.imageBase64 = null;
  }

  setTabSelector(index: number) {
    this.reinit();
    this.tabSelector = index;
  }

  initializeCamera() {
    const video = document.getElementById('video') as HTMLVideoElement;

    // Demande à l'utilisateur d'accorder la permission d'accès à la caméra
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => console.error('Erreur lors de l\'accès à la caméra :', error));
  }

  switchCamera() {
    const video = document.getElementById('video') as HTMLVideoElement;
    if (!!video.srcObject && "getTracks" in video.srcObject) {
      const videoTracks = video.srcObject.getTracks();

      // Arrête l'accès à la caméra actuelle
      videoTracks.forEach(track => track.stop());

      // Récupère la liste des dispositifs de capture vidéo
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          let facingMode = 'environment'; // Caméra arrière par défaut

          // Recherche la caméra avant (selfie) et arrière
          const frontCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('front'));
          const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('back'));

          if (!!frontCamera && !!rearCamera) {
            // Détermine quelle caméra est actuellement active et bascule vers l'autre
            const activeCamera = videoTracks[0].getSettings().deviceId;
            facingMode = (activeCamera === frontCamera.deviceId) ? 'environment' : 'user'

            // Bascule entre la caméra avant et arrière
            const constraints = {
              video: {deviceId: {exact: (facingMode === 'environment') ? rearCamera.deviceId : frontCamera.deviceId}}
            };

            // Demande l'accès à la nouvelle caméra
            navigator.mediaDevices.getUserMedia(constraints)
              .then(stream => {
                video.srcObject = stream;
                video.play();
              })
              .catch(error => console.error('Erreur lors du changement de caméra :', error));
          }
        })
        .catch(error => console.error('Erreur lors de la récupération des dispositifs de capture vidéo :', error));
    }
  }

  resetCamera() {
    this.isPictureChoose = false;
    this.initializeCamera();
  }

  capturePhoto() {
    this.isPictureChoose = true;

    const video = document.getElementById('video') as HTMLVideoElement;
    const canvasElement = document.createElement('canvas');

    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    const context = canvasElement.getContext('2d');
    if (!!context && !!this.canvas.width && !!this.canvas.height) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      let ratio = Math.min(this.canvas.width / canvasElement.width, this.canvas.height / canvasElement.height);
      let imageLeft = (this.canvas.width - (canvasElement.width * ratio)) / 2;
      let imageTop = (this.canvas.height - (canvasElement.height * ratio)) / 2;

      this.image = new fabric.Image(canvasElement, {
        left: imageLeft,
        top: imageTop,
        scaleX: ratio,
        scaleY: ratio
      });

      //this.imageBase64 = canvasElement.toDataURL();

      this.canvas.add(this.image);

      this.imageBase64 = this.canvas.toDataURL();
    }

    video.srcObject = null; // Arrête la capture vidéo
  }

  applyFilter(filter: string) {
    if (this.image) {
      let fabricFilter;

      switch (filter) {
        case 'grayscale':
          fabricFilter = new fabric.Image.filters.Grayscale();
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'sepia':
          fabricFilter = new fabric.Image.filters.Sepia();
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'invert':
          fabricFilter = new fabric.Image.filters.Invert();
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'brightness':
          fabricFilter = new fabric.Image.filters.Brightness({
            brightness: 0.2 // Ajustez la valeur de luminosité si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'contrast':
          fabricFilter = new fabric.Image.filters.Contrast({
            contrast: 0.5 // Ajustez la valeur de contraste si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'saturation':
          fabricFilter = new fabric.Image.filters.Saturation({
            saturation: 0.2 // Ajustez la valeur de saturation si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'blur':
          fabricFilter = new fabric.Image.filters.Blur({
            blur: 0.5 // Ajustez la valeur de flou si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'emboss':
          fabricFilter = new fabric.Image.filters.Convolute({
            matrix: [ 1,   1,  1,
              1, 0.7, -1,
              -1,  -1, -1 ] // Ajustez la matrice du relief si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'sharpen':
          fabricFilter = new fabric.Image.filters.Convolute({
            matrix: [  0, -1,  0,
              -1,  5, -1,
              0, -1,  0 ] // Ajustez la matrice de netteté si nécessaire
          });
          this.image.filters = [fabricFilter];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'vintage':
          fabricFilter = new fabric.Image.filters.Sepia(); // Sépia
          const brightnessFilterVintage = new fabric.Image.filters.Brightness({
            brightness: 0.1 // Luminosité légèrement augmentée
          });
          const contrastFilterVintage = new fabric.Image.filters.Contrast({
            contrast: 0.9 // Contraste augmenté
          });
          this.image.filters = [fabricFilter, brightnessFilterVintage, contrastFilterVintage];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'cool':
          const hueRotationFilterCool = new fabric.Image.filters.HueRotation({
            rotation: -0.5 // Rotation de teinte vers le bleu
          });
          const saturationFilterCool = new fabric.Image.filters.Saturation({
            saturation: 0.8 // Saturation augmentée
          });
          this.image.filters = [hueRotationFilterCool, saturationFilterCool];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'warm':
          const hueRotationFilterWarm = new fabric.Image.filters.HueRotation({
            rotation: 0.3 // Rotation de teinte vers le rouge/orange
          });
          const contrastFilterWarm = new fabric.Image.filters.Contrast({
            contrast: 0.8 // Contraste réduit
          });
          this.image.filters = [hueRotationFilterWarm, contrastFilterWarm];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        case 'black-and-white':
          fabricFilter = new fabric.Image.filters.Grayscale(); // Niveaux de gris
          const contrastFilterBW = new fabric.Image.filters.Contrast({
            contrast: 2.0 // Contraste fortement augmenté
          });
          this.image.filters = [fabricFilter, contrastFilterBW];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
        default:
          this.image.filters = [];
          this.image.applyFilters();
          this.canvas.renderAll();
          break;
      }

      this.imageBase64 = this.canvas.toDataURL();
    }
  }

  /**
   * Choose Picture from File
   */
  choosePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png,.jpg';
    fileInput.addEventListener('change', (event: any) => {
      this.isPictureChoose = true;
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const canvasElement = document.createElement('canvas');
          canvasElement.width = image.width;
          canvasElement.height = image.height;
          const context = canvasElement.getContext('2d');

          if (context && this.canvas.width && this.canvas.height) {
            context.drawImage(image, 0, 0, image.width, image.height);

            let ratio = Math.min(this.canvas.width / canvasElement.width, this.canvas.height / canvasElement.height);
            let imageLeft = (this.canvas.width - (canvasElement.width * ratio)) / 2;
            let imageTop = (this.canvas.height - (canvasElement.height * ratio)) / 2;

            this.image = new fabric.Image(canvasElement, {
              left: imageLeft,
              top: imageTop,
              scaleX: ratio,
              scaleY: ratio
            });

            //this.imageBase64 = canvasElement.toDataURL();

            this.canvas.add(this.image);

            this.imageBase64 = this.canvas.toDataURL();
          }
        };
      }

      reader.readAsDataURL(file);
    });
    fileInput.click();
  }

  imageCropped(croppedImage: any) {
    this.finaleImage = croppedImage.picture;
  }

  public saveImage(): void {
    this.postModelService.createPost(this.finaleImage,this.ratio);
    this.returnPostPage();
    this.reinit();
  }
}

