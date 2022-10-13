import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SimpleForm } from "../shared/interfaces/simple-form.model";
import { EnvironmentUrlService } from "../shared/services/environment-url.service";

@Injectable({
  providedIn: 'root'
})
export class SimpleFormService {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public submitForm = (route: string, simpleform: SimpleForm) => {
    var hdr = {
        headers: ({ 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin', "Access-Control-Allow-Methods": "POST, GET, OPTIONS", 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://localhost:4200' })
      }
      const res = this.http.post<SimpleForm>(this.createCompleteRoute(route, this.envUrl.urlAddress), simpleform, hdr);
      return res;
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
