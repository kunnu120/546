import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  product_list: {
    name: string,
    price: number,
    category: string,
    image: string
  }[];
  constructor(private route: Router) {
    this.product_list = [{name: "Pen", price: 200, category: "School", image: "https://recordergear.com/wp-content/uploads/2019/02/SL100-main.jpg"  },
    {name: "Cup", price: 500, category: "Household", image: "https://www.cpsc.gov/s3fs-public/Recall.2013.13210.LYDA%2520CupLARGE.jpg"  },
    {name: "Hat", price: 800, category: "Outfit", image: "https://media.istockphoto.com/photos/retro-top-hat-ready-to-wear-on-white-background-picture-id154955604?k=6&m=154955604&s=612x612&w=0&h=QmadWFZ94jHLf9q-Z3KetD6ZXUjpsUphbs8gz11EoBc="  },
    {name: "Basketball", price: 1000, category: "Sports", image: "https://images-na.ssl-images-amazon.com/images/I/812KIWTmlRL._SX425_.jpg"  },
    {name: "NoteBook", price: 300, category: "School", image: "https://cdn.shopify.com/s/files/1/0535/3509/products/econ-notebook-front_1024x1024.jpg?v=1575931709"  }
  ]
  console.log(this.product_list);
  }
  goToProductDetail(item: any) {
    console.log(item)
    this.route.navigate(['product-detail-page', {items: JSON.stringify(item)}]);

  }

  goToAddProductPage() {
    this.route.navigate(['add-product-page']);
  }

  goToLogin() {
    this.route.navigate(['login-page']);
  }

  goToLogout() {
    this.route.navigate(['login-page']);
  }

}
