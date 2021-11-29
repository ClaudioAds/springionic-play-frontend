import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDto } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDto;

  parcelas: number[] = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10];

  //para controlar os dados das entradas na tabela 
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      //vai receber o objeto que vem na navegação da página d endereço
      this.pedido = this.navParams.get('pedido');

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }

}
