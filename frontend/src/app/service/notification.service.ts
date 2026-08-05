import { Injectable } from '@angular/core';

type NotificationKind = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private show(message: string, title: string, kind: NotificationKind): void {
    const toast = document.createElement('div');
    toast.className = `app-toast app-toast--${kind}`;
    toast.setAttribute('role', kind === 'error' ? 'alert' : 'status');

    const heading = document.createElement('strong');
    heading.textContent = title;
    const body = document.createElement('span');
    body.textContent = message;
    toast.append(heading, body);
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('app-toast--visible'));
    setTimeout(() => {
      toast.classList.remove('app-toast--visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }

  showSuccess(message: string, title: string) {
    this.show(message, title, 'success');
  }

  showError(message: string, title: string) {
    this.show(message, title, 'error');
  }

  showInfo(message: string, title: string) {
    this.show(message, title, 'info');
  }

  showWarning(message: string, title: string) {
    this.show(message, title, 'warning');
  }
}
