import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fabric} from "fabric";
import {PostModelService} from "../../../../viewModel/post-model.service";
import {Data, FilterType} from "../../../../utils/Data";
import {SnackbarService} from "../../../../shared/service/snackbar.service";
import {max} from "rxjs";
import {LoaderService} from "../../../../shared/service/loader.service";

@Component({
  selector: 'app-generate-picture',
  templateUrl: './generate-picture.component.html',
  styleUrls: ['./generate-picture.component.scss']
})
export class GeneratePictureComponent implements AfterViewInit, OnInit, OnDestroy {

  @Output() public goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isPictureChoose : boolean = false;

  public filters: string[] = Data.getFilterList();
  public filterType: FilterType[] = Data.getFilterTypeList();
  public filterSelected: string = 'none';

  public canvas!: fabric.Canvas;
  public image!: fabric.Image;

  private isSelfie: boolean = true;


  private videoStream: MediaStream | null = null;
  public maxHeight: number = 500;
  public maxWidth: number = 500;
  public filterHeight: number = 0;
  public navBarHeight: number = 0;

  public ratio : number = 1;
  private finaleImage: any;

  public imageBase64 : any;

  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;
  @ViewChild('filterButton', { static: false }) filterButton!: ElementRef;
  @ViewChild('toolbar', { static: false }) toolbar!: ElementRef;
  constructor(
    private postModelService: PostModelService,
    private snackBarService: SnackbarService,
    private loaderService: LoaderService,
  ) {
  }

  ngAfterViewInit() {

    this.navBarHeight = this.toolbar.nativeElement.offsetHeight;
    this.maxHeight = window.innerHeight - this.navBarHeight;
    this.maxWidth = window.innerWidth

    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
      isDrawingMode: false,
      skipTargetFind: true,
      defaultCursor: 'default',
      hoverCursor: 'default',
      moveCursor: 'default',
      height: this.maxHeight - this.navBarHeight *2,
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

  disableCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }

  }

  reinit() {
    this.disableCamera();
    this.isPictureChoose = false;
    this.filterSelected = 'none';
    this.canvas.clear();
    this.canvas.renderAll();
    this.imageBase64 = null;
  }

  initializeCamera() {
    const video = document.getElementById('video') as HTMLVideoElement;

    // Demande à l'utilisateur d'accorder la permission d'accès à la caméra
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(stream => {
        this.videoStream = stream;
        video.srcObject = stream;
        video.classList.add('mirror');
        video.play();
      })
      .catch(error => {
        console.error(error);
        this.snackBarService.showSnackbar("error", "Erreur lors de l'accès à la caméra");
      });
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
            facingMode = (activeCamera === frontCamera.deviceId) ? 'environment' : 'user';

            this.isSelfie = !(activeCamera === frontCamera.deviceId)

            this.isSelfie ? video.classList.add('mirror') : video.classList.remove('mirror');

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
    this.reinit();
    this.initializeCamera();
  }

  capturePhoto() {
    this.isPictureChoose = true;
    this.loaderService.setLoader(true, 500);

    const video = document.getElementById('video') as HTMLVideoElement;

    this.createPicture(video, video.videoWidth, video.videoHeight);

    this.disableCamera();
  }

  createPicture(video: any, width : number, height: number, isFromFile : boolean = false) {
    const canvasElement = document.createElement('canvas');
    if (width > 2048 || height > 2048) {
      const ratio = Math.max(width / 2048, height / 2048);
      width = width / ratio;
      height = height / ratio;
    }

    canvasElement.width = width;
    canvasElement.height = height;

    const ctx = canvasElement.getContext('2d');

    if (this.isSelfie && !isFromFile) {
      ctx?.scale(-1, 1);
      ctx?.translate(-width, 0);
    }
    ctx?.drawImage(video, 0, 0, width, height);

    this.canvas.setWidth(canvasElement.width);
    this.canvas.setHeight(canvasElement.height);

    this.image = new fabric.Image(canvasElement, {
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1
    });

    this.canvas.add(this.image);

    this.imageBase64 = this.canvas.toDataURL();
    this.loaderService.setLoader(false);
  }

  applyFilter(filter: string = '') {
    if (this.image) {

      this.filterSelected = filter;

      this.image.filters = Data.filter(filter, this.filterType);
      this.image.applyFilters();
      this.canvas.renderAll();

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
      this.loaderService.setLoader(true, 500);

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.disableCamera();

        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          this.createPicture(image, image.width, image.height, true);
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

