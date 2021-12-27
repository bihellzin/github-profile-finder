import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  searchStr: string = "";

  modelChange(str: string): void {
    this.searchStr = str;
  }

}
