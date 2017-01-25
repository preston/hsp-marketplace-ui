import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {Service} from '../models/service';

@Injectable()
export class ServiceService extends BaseService {

    public static PATH: string = '/services';
    public static SEARCH_PATH: string = '/services/search';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + ServiceService.PATH;
    }

    searchUrl(): string {
        return this.marketplaceService.url + ServiceService.SEARCH_PATH;
    }

    search(text: string) {
        let services = this.http.post(this.searchUrl(), { text: text }, this.options()).map(res => res.json());
        return services;
    }

    searchPublished(text: string) {
        let services = this.http.post(this.searchUrl() + '?published=true', { text: text }, this.options()).map(res => res.json());
        return services;
    }

    searchUnpublished(text: string) {
        let services = this.http.post(this.searchUrl() + '?published=false', { text: text }, this.options()).map(res => res.json());
        return services;
    }


    index() {
        let services = this.http.get(this.url(), this.options()).map(res => res.json());
        return services;
    }

    published() {
        let services = this.http.get(this.url() + '?published=true', this.options()).map(res => res.json());
        return services;
    }

    unpublished() {
        let services = this.http.get(this.url() + '?published=false', this.options()).map(res => res.json());
        return services;
    }

    get(id: string) {
        let service = this.http.get(this.url() + '/' + id, this.options()).map(res => res.json());
        return service;
    }

    create(service: Service) {
        let obs = this.http.post(this.url(), { 'service': service }, this.options()).map(res => res.json());
        return obs;
    }

    update(service: Service) {
        let obs = this.http.put(this.url() + '/' + service.id, { 'service': service }, this.options()).map(res => res.json());
        return obs;
    }

    delete(service: Service) {
        let obs = this.http.delete(this.url() + '/' + service.id, this.options()).map(res => res.json());
        return obs;
    }

    publish(service: Service) {
        let obs = this.http.post(this.url() + '/' + service.id + '/publish', {}, this.options()).map(res => res.json());
        return obs;
    }

    unpublish(service: Service) {
        let obs = this.http.post(this.url() + '/' + service.id + '/unpublish', {}, this.options()).map(res => res.json());
        return obs;
    }

}
