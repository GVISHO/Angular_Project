import { Directive,ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundImageRotator]',
  standalone: true
})
export class BackgroundImageRotatorDirective implements OnInit {
  private images:string[]=[
    'url(https://static.wixstatic.com/media/c837a6_f58829a26e594ca3aa72383e19cf39b9~mv2.png/v1/fill/w_1448,h_565,al_r,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_f58829a26e594ca3aa72383e19cf39b9~mv2.png)',
    'url(https://static.wixstatic.com/media/c837a6_9c1280daaeb0481abc58e6e236efdf59~mv2.png/v1/fill/w_1448,h_565,al_br,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_9c1280daaeb0481abc58e6e236efdf59~mv2.png)',
    'url(https://static.wixstatic.com/media/c837a6_837f9cd4f59146c3ad47a2bd882fedfd~mv2.png/v1/fill/w_980,h_565,al_r,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_837f9cd4f59146c3ad47a2bd882fedfd~mv2.png)'
  ]
  private currentIndex: number = 0;
  constructor(private element: ElementRef) { }
 ngOnInit(): void {
    this.changeBackgroundImage();
    setInterval(() => this.changeBackgroundImage(), 5000);
  }
  private changeBackgroundImage(): void {
    this.element.nativeElement.style.backgroundImage = this.images[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
