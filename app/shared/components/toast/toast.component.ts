import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastData, ToastService } from '../../services/toast.service';

declare const bootstrap: any;

@Component({
    selector: 'app-toast',
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('liveToast') toastElement!: ElementRef;
    currentToastData: ToastData = { title: '', message: '', type: 'info', show: false };
    private toastSubscription!: Subscription;
    private bsToast: any;

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
        this.toastSubscription = this.toastService.toastData$.subscribe(data => {
            this.currentToastData = data;
            if (data.show) {
                this.showToast();
            } else {
                this.hideToast();
            }
        });
    }

    ngAfterViewInit(): void {
        this.bsToast = new bootstrap.Toast(this.toastElement.nativeElement, {
            delay: this.currentToastData.delay || 5000
        });
        this.toastElement.nativeElement.addEventListener('hidden.bs.toast', () => {
            this.toastService.hide();
        });
    }

    ngOnDestroy(): void {
        if (this.toastSubscription) {
            this.toastSubscription.unsubscribe();
        }
        if (this.bsToast) {
            this.bsToast.dispose();
        }
    }

    private showToast(): void {
        if (this.bsToast) {
            this.bsToast.show();
        }
    }

    private hideToast(): void {
        if (this.bsToast) {
            this.bsToast.hide();
        }
    }
}
