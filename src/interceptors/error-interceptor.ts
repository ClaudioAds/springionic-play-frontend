import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req) //Continua a requisição
        .catch((error, caught) => {
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
            
            return Observable.throw(errorObj);
        }) as any;
    } 
}
//exigencias para se criar um interceptoor de error
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};