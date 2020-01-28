import { Component, OnInit } from '@angular/core';
import { MemeService } from '@app/_services';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap, finalize } from 'rxjs/operators';
import { Meme } from '@app/_models/meme'
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-add-meme',
  templateUrl: './add-meme.component.html',
  styleUrls: ['./add-meme.component.less']
})
export class AddMemeComponent implements OnInit {

  registryForm: FormGroup
  loading = false
  returnUrl: string
  error = ''
  success = ''
  display = null
  file = null
  uploadPercent

  get f() { return this.registryForm.controls }

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private memeService: MemeService,
    private firebaseStorage: AngularFireStorage) {
    this.registryForm = _fb.group({
      'title': [null, Validators.compose([
        Validators.required
      ])],
      'image': [null, Validators.compose([
        Validators.required
      ])]
    })
  }

  ngOnInit() {
  }

  choosePicture(files: FileList) {
    this.file = files.item(0)
    let reader = new FileReader()

    reader.onload = (e: any) => {
      this.display = e.target.result
    }

    reader.readAsDataURL(files.item(0))
  }

  uploadPost(formValue) {
    if (!this.file) {
      this.error = "File can't be empty"
      return
    } else {
      this.error = ''
    }
    if (this.registryForm.controls.title.value < 5 || this.registryForm.controls.title.value > 30) {
      this.registryForm.controls.title.markAsTouched()
      return
    }
    this.loading = true
    const filePath = Math.random().toString(36).substring(7)
    const fileRef = this.firebaseStorage.ref(filePath)
    const task = this.firebaseStorage.upload(filePath, this.file)

    console.log("submitClicked")
    // observe percentage changes
    this.uploadPercent = task.percentageChanges()
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        console.log("Upload started")
        fileRef.getDownloadURL()
          .subscribe((downloadURL) => {
            console.log(downloadURL)
            console.log("title: " + this.registryForm.controls.title.value)
            this.memeService.create({
              "title": this.registryForm.controls.title.value,
              "img_url": downloadURL
            }).subscribe(() => {
              this.displaySuccessAndNavigate()
            },
              (error) => {
                this.error = error
                console.log(error)
              })
          })
      })
    )
      .subscribe()
  }

  displaySuccessAndNavigate() {
    this.success = 'Upload successfull'
    timer(1000)
      .subscribe(() => {
        this.router.navigate([''])
      })
  }
}
