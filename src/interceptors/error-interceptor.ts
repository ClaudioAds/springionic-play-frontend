import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {

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
                    case 401:
                        this.handle401();
                    break;    
                    case 403:
                       this.handle403();
                    break;

                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Error 401: falha de autenticação',
            message: 'Eamil ou senha incorretos',
            //para sair do Alert somente clicando no X
            //Se não colocar, pode clicar em qualquer parte que fecha o Alert
            enableBackdropDismiss: false, 
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    //para tratar o erro 403
    //caso apareçam mais, criar o erro e adicionar ao switch
    handle403() {
        //limpando o localStorage
        this.storage.setLocalUser(null);
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            //para sair do Alert somente clicando no X
            //Se não colocar, pode clicar em qualquer parte que fecha o Alert
            enableBackdropDismiss: false, 
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
}
//exigencias para se criar um interceptoor de error
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};