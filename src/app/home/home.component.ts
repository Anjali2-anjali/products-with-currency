import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name = "Angular";
  products: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.products = [
      {
        name: "Rebook",
        price: 2570,
        type: "INR",
        image_url:
          "https://rukminim1.flixcart.com/image/800/960/jzog9e80/shoe/f/p/t/dv7900-12-reebok-grey-black-original-imafhvgmvmhr8yb7.jpeg?q=50"
      },
      {
        name: "Sparx",
        price: 1428,
        type: "INR",
        image_url:
          "https://rukminim1.flixcart.com/image/800/960/k5vcya80pkrrdj/shoe/8/4/y/7-sm-482-running-shoe-7-multicolor-sparx-original-imafk9u4z4j9vqgy.jpeg?q=50"
      },
      {
        name: "Nike",
        price: 2427,
        type: "INR",
        image_url:
          "https://images-na.ssl-images-amazon.com/images/I/71qxAo0BcTL._UL1500_.jpg"
      }
    ];
  }

  changePrices(event) {
    console.log(event);
    let url = "https://api.exchangeratesapi.io/latest?base=" + event;
    this.http.get(url).subscribe(data => {
      if (event == "USD") {
        let value = data["rates"].INR;
        this.products = this.products.map(item => {
          return ({name:item.name,type:"INR",image_url:item.image_url,price:Math.round(item.price*value)})
        })
        console.log(this.products);
      } else {
        let value = data["rates"].USD;
        this.products = this.products.map(item => {
          return ({name:item.name,type:"USD",image_url:item.image_url,price:Math.round(item.price*value)})
        })
        console.log(this.products);
      }
    });
  }

}
