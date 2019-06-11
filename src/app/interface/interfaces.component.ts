import {Component, Output, Inject} from '@angular/core';

import {UUID} from 'angular2-uuid';

import {Interface} from '../interface/interface';


import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {InterfaceService} from '../interface/interface.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'interfaces',
    templateUrl: 'interfaces.component.html'
})
export class InterfacesComponent {

    // The current selection, if any.
    interface: Interface;
    interfaces: Array<Interface>;

    constructor(private backendService: BackendService,
        private interfaceService: InterfaceService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.interfaces = new Array<Interface>();
        this.interfaceService.index().subscribe(d => {
            this.interfaces = d['results'];
        });
    }

    select(iface: Interface) {
        this.interface = iface;
    }

    create() {
        let iface = new Interface();
		let uuid = UUID.UUID()
        iface.name = "New Interface " + uuid;
		iface.uri = "hspc://interfaces/" + uuid;
		iface.version = "" + uuid;
        this.interfaceService.create(iface).subscribe(d => {
            this.toasterService.pop('success', 'Interface Created', 'Please update the details accordingly!');
            this.interfaces.push(d);
            this.select(d);
        });
    }
    update(iface: Interface) {
        this.interfaceService.update(iface).subscribe(d => {
            this.toasterService.pop('success', 'Interface Updated');
            let i = this.interfaces.indexOf(iface, 0);
            this.interfaces[i] = d;
        });
    }
    delete(iface: Interface) {
        this.interfaceService.delete(iface).subscribe(d => {
            this.toasterService.pop('success', 'Interface Deleted');
            let i = this.interfaces.indexOf(iface, 0);
            if (i >= 0) {
                this.interfaces.splice(i, 1);
            }
            this.select(null);
        });
    }
}
