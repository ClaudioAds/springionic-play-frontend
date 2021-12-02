import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  //para fazer concatenação de paginas no front e back
  items : ProdutoDTO[] = [];

  //para controle da paginação
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, //esse objeto tem os parâmetros passados na navegação
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentingLoading();
    //pegando o id dos campos
    this.produtoService.findByCategoria(categoria_id, this.page, 10) //indo buscar de 10 em 10
      .subscribe(response => {//esse id que ta vindo do back vem paginado
        let start = this.items.length; //pegando o tamanho da lista inicial
        this.items = this.items.concat(response['content']);// no content tem os produtos por categoria
        let end = this.items.length - 1;//pegando o tamanho da lista final
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => {});
    }
  }

  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentingLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;//incrementa a página a cada chamada do método
    this.loadData();//carrega mais dados para a próxima
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
