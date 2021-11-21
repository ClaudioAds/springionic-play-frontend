import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }
//Fazendo um inteceptor pra saber se existe token localmente
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseURL.length;
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseURL;

        if (localUser && requestToApi) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else {
            return next.handle(req);//Continua a requisição sem cabesalho se o localUser não existir 
        }
            
    } 
}
//exigencias para se criar um interceptoor de error
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};