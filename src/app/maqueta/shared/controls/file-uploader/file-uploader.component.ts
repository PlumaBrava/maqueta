// import { Component, ViewEncapsulation } from '@angular/core';
import { Component, ChangeDetectorRef, ViewEncapsulation , EventEmitter,  Output} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
// import { MensajesService }  from '../services/mensajes/mensajes.service';
@Component({
  selector: 'app-file-uploader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
     @Output() urlReceived = new EventEmitter<string>();
    public file:any;
    public fileName:string;
  
    fileChange(input){
        const reader = new FileReader();
        if (input.files.length) {       
            this.fileName = input.files[0].name; 
            this.file = input.files[0]; 
            console.log(this.file); 
            this.startUpload();          
        }
    }

    removeFile():void{
        this.file = '';
    }

// inicio subida de archivo

task: AngularFireUploadTask;

  // percentage: Observable<number>;
  percentage:number=null;
  snapshot: Observable<any>;
  downloadURL: string;  
  constructor(private storage: AngularFireStorage, private db: AngularFirestore,
    // private mensageService:MensajesService,
    ) { }

  ngOnInit() {
    
  }

  startUpload() {
    console.log('start upload');
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
     this.task.percentageChanges().subscribe(data=>{
      console.log(data);
      this.percentage=data
    });

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.snapshot=null;
        this.urlReceived.emit(this.downloadURL);
         console.log('downloadURL',this.downloadURL);
        //   this.mensageService.setUrlImagenObs(this.downloadURL).subscribe(data=>{
        //   console.log('setReset',data);
        // });
        // this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }




// fin subida de archivo



}


