import { ItemPedidoDto } from "./item-pedido.dto";
import { PagamentoDto } from "./pagamento.dto";
import { RefDto } from "./ref.dto";

export interface PedidoDto {
    cliente: RefDto;
    enderecoDeEntrega: RefDto;
    pagamento: PagamentoDto;
    items: ItemPedidoDto[];
}