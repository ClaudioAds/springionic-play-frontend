import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req) //Continua a requisição normalmente
            .catch((error, caught) => {//se der erro
                //trecho criado somente para exibir o error personalizado  
                //que vem da API
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor: ");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 403:
                       this.handle403();
                    break;
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    //para tratar o erro 403
    //caso apareçam mais, criar o erro e adicionar ao switch
    handle403() {
        //limpando o localStorage
        this.storage.setLocalUser(null);
    }
}
//exigencias para se criar um interceptoor de error
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};