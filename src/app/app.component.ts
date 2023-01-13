import { Component, OnInit } from '@angular/core';
import { country } from './models/model';
import axios from 'axios'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Hello world for Vuejs';
  countrydata?: country
  sentenceResult?: string
  error?: string

  constructor(
  ) {}

  ngOnInit() {
    this.getApi();
  }

  /**
   * 提交html中的form
   */
  onSubmit(data: any): void {

    let check = new RegExp("[A-Za-z]+");
    try {
      if (data.sentence == '') {
        this.error = '請先輸入英文句子喔！';
      } else if (!check.test(data.sentence)) {
        this.error = '請輸入「英文」句子喔！';
      } else {
        this.sentenceResult = this.reverseString((data.sentence).toString());
      }
    } catch {
      this.error = 'OOPS！有東西出錯啦！';
    }
  }

  /**
   * 倒轉英文句的排列順序
   * @param str 欲倒轉之句型
   * @returns 倒轉後
   */
  reverseString(str:string) {
    str = str.split(" ").reverse().join(" ").toString();
    this.error = ''
    return str;
  }

  /**
   * 取得API內容
   */
  getApi() {
    axios.get<country>('https://api.nationalize.io/?name=nathaniel')
    .then((response: any) => {
      this.countrydata = response.data;
    })
    .catch(e => {
      console.log(e);
    })
  }
}


