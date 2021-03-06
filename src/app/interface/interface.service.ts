import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {Interface} from '../interface/interface';

@Injectable()
export class InterfaceService extends BaseService {

    public static PATH: string = '/interfaces';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.getUrl() + InterfaceService.PATH;
    }

    index() {
        let interfaces = this.http.get<Interface[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return interfaces;
    }

    get(id: string) {
        let platform = this.http.get<Interface>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(iface: Interface) {
        let obs = this.http.post<Interface>(this.url(), { 'interface': iface }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(iface: Interface) {
        let obs = this.http.put<Interface>(this.url() + '/' + iface.id, { 'interface': iface }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(iface: Interface) {
        let obs = this.http.delete<Interface>(this.url() + '/' + iface.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }
}
