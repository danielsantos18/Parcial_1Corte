import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.getProductDetails(id);
    });
  }

  getProductDetails(productId: number) {
    this.apiService.getProductById(productId).subscribe(
      product => {
        this.product = product;
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  async addToCart() {
    if (this.product) {
      this.apiService.addToCart(this.product);

      const toast = await this.toastController.create({
        message: 'Producto añadido al carrito',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  toCart() {
    this.router.navigate(['/cart']);
  }
}
