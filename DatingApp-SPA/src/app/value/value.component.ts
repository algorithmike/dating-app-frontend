import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  public values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  public getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(x => {
      this.values = x;
      console.log(x);
    }, errors => {
      console.log(errors);
    });
  }
}