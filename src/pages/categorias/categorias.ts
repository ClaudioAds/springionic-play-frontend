import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaServide: CategoriaService) {
  }



  ionViewDidLoad() {
    this.categoriaServide.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});

  }
  //id para fazer a busca no back-end
  showProdutos(categoria_id : string) { //parametro e valor que vem
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});//passando parametros de uma pagina para outra
  }

}
