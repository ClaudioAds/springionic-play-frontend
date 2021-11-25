import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/categoria.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, //esse objeto tem os parâmetros passados na navegação
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    //pegando o id dos campos
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {//esse id que ta vindo do back vem paginado
        this.items = response['content'];// no content tem os produtos por categoria
      },
        error => {});
  }
}
