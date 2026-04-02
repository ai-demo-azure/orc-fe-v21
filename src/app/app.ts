import { Component, signal } from '@angular/core';
import { OcrDemoComponent } from './ocr-demo/ocr-demo';

@Component({
  selector: 'app-root',
  imports: [OcrDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('orc-fe-v21');
}
