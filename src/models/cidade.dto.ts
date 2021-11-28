import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    nome: string;
    estado?: EstadoDTO;//pra não inteferir na busca por cidade
}