import { SafeUrl } from '@angular/platform-browser';

export interface User {
  login: string,
  avatar_url: string,
  html_url: SafeUrl
}
