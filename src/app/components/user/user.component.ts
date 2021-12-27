import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { User } from 'src/app/services/user.model';
import { UserService } from 'src/app/services/user.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy, OnChanges {

  @Input ()
  username: string;

  destroy$ = new Subject<boolean>();

  userInfo: User
  typingInterval = 500;
  typingTimer: ReturnType<typeof setTimeout>;
  hasUser = false;

  constructor(
    private userService: UserService,
    private sanitization: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.searchUser(changes.username.currentValue), this.typingInterval);
    } else {
      this.typingTimer = setTimeout(() => this.searchUser(changes.username.currentValue), this.typingInterval);
    }
  }

  searchUser(username: string): void {
    this.userService.getUser(username)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          this.hasUser = true;
          this.userInfo = {
            login: value.login,
            avatar_url: value.avatar_url,
            html_url: this.sanitization.bypassSecurityTrustUrl(value.html_url)
          };
        },
        error => {
          this.hasUser = false;
          console.log(error)
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
