import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploaderComponent } from './controls/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './controls/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './controls/multiple-image-uploader/multiple-image-uploader.component';


@NgModule({
  declarations: [
	  FileUploaderComponent,
	  ImageUploaderComponent,
	  MultipleImageUploaderComponent
  ],
  exports: [
   	 FileUploaderComponent,
	 ImageUploaderComponent,
	 MultipleImageUploaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
