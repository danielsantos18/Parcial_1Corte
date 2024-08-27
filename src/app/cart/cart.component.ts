import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private apiService: ApiService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.apiService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  async removeItem(item: any) {
    const index = this.cartItems.findIndex(p => p.id === item.id);

    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.apiService.clearCart();
      this.cartItems.forEach(product => this.apiService.addToCart(product));
      this.calculateTotalAmount();
    }

    const toast = await this.toastController.create({
      message: 'Producto eliminado del carrito',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async pagar() {
    const toast = await this.toastController.create({
      message: 'Pago exitoso!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  clearCart() {
    this.apiService.clearCart();
    this.cartItems = [];
    this.totalAmount = 0;
  }

  toHome() {
    this.router.navigate(['/home']);
  }
}
