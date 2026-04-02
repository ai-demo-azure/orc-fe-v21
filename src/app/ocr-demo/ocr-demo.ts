import { Component, HostListener, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ocr } from '../services/ocr';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-ocr-demo',
  templateUrl: './ocr-demo.html',
  styleUrls: ['./ocr-demo.css'],
  imports: [FormsModule, CommonModule],
})
export class OcrDemoComponent {
  result = signal<any>(null);
  loading = signal<boolean>(false);
  imageUrl = signal<string>('http://metalbyexample.com/wp-content/uploads/figure-65.png');
  previewSrc = signal<string | null>(this.imageUrl());

  constructor(
    private ocrService: Ocr,
    private toastr: ToastrService,
  ) {}

  analyzeUrl() {
    this.previewSrc.set(this.imageUrl());
    this.loading.set(true);
    this.ocrService
      .analyzeImageUrl(this.imageUrl(), 'v3.2')
      .pipe(
        finalize(() => this.loading.set(false)), // 🔑 correct operator
      )
      .subscribe({
        next: (res) => this.result.set(res),
        error: (err) => this.toastr.error(err),
      });
  }

  analyzeUpload(file: File) {
    this.processFile(file);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }
  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            this.processFile(file);
          }
        }
      }
    }
  }

  private processFile(file: File) {
    this.previewSrc.set(URL.createObjectURL(file));
    this.imageUrl.set(''); // clear URL when using pasted/uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]; // strip "data:image/png;base64,"
      this.loading.set(true);
      this.ocrService
        .analyzeImageUpload(base64, 'v3.2')
        .pipe(
          finalize(() => this.loading.set(false)), // 🔑 correct operator
        )
        .subscribe({
          next: (res) => this.result.set(res),
          error: (err) => this.toastr.error(err),
        });
    };
    reader.readAsDataURL(file);
  }
}
