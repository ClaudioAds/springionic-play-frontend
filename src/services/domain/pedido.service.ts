import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDto } from "../../models/pedido.dto";

@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {
    }

    insert(obj: PedidoDto) {
        return this.http.post(
            `${API_CONFIG.baseURL}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}