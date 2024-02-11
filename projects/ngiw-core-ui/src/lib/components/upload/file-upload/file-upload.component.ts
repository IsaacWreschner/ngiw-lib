import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngiw-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  @Input() ngiwFormat = 'jpg';
  @Input() ngiwUploadPath!: string | ((file: NzUploadFile) => string | Observable<string>);
  @Input() ngiwDisplay:any = 'text';
  @Input() ngiwFiles:any = [];
  @Input() ngiwMaxUploads = 0;
  @Input() ngiwMultiSelect = false;
  @Input() ngiwAddFileLabel = 'Add File';
  @Input() ngiwHint = '';

  @Output()ngiwFilesChanged = new EventEmitter();


  previewImage: string | undefined = '';
  previewVisible = false;

  ngOnInit() {
     setInterval(() => {
      console.log(this.ngiwFiles)
     },2000)
  }

  isMultiSelectEnabled = () => {
    return this.ngiwMultiSelect && (this.isFilesUploadUnlimited() || this.getMaxFilesToUpload() > 1) ;
  }

  canUploadMoreFiles = () => {
    return this.isFilesUploadUnlimited() || this.getMaxFilesToUpload() > 0;
  }

  isFilesUploadUnlimited = () => {
    return this.ngiwMaxUploads < 1;
  }

  getMaxFilesToUpload = () => {
    return this.ngiwMaxUploads - this.ngiwFiles.length;
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log(file)
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    onUploadStateChanged = () => {
      this.ngiwFilesChanged.emit(this.ngiwFiles);
    }
}
