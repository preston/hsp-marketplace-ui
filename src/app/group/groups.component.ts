import {Component, Output, Inject} from '@angular/core';

import {Group} from './group';

import {UUID} from 'angular2-uuid';

import {ToastrService} from 'ngx-toastr';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {GroupService} from './group.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'groups',
    templateUrl: 'groups.component.html'
})
export class GroupsComponent {

    // The current selection, if any.
    group: Group;
    groups: Array<Group>;

    constructor(private backendService: BackendService,
        private groupService: GroupService,
        private toastrService: ToastrService) {
        this.reload();
    }

    reload() {
        this.groups = new Array<Group>();
        this.groupService.index().subscribe(d => {
            this.groups = d['results'];
        });
    }

    select(group: Group) {
        this.group = group;
    }

    create() {
        let group = new Group();
        group.name = "New Group " + UUID.UUID();
        this.groupService.create(group).subscribe(d => {
            this.toastrService.success('Please update the details accordingly!', 'Group Created');
            this.groups.push(d);
            this.select(d);
        });
    }
    update(group: Group) {
        this.groupService.update(group).subscribe(d => {
            this.toastrService.success('Group Updated');
            let i = this.groups.indexOf(group, 0);
            this.groups[i] = d;
        });
    }
    delete(group: Group) {
        this.groupService.delete(group).subscribe(d => {
            this.toastrService.success('Group Deleted');
            let i = this.groups.indexOf(group, 0);
            if (i >= 0) {
                this.groups.splice(i, 1);
            }
            this.select(null);
        });
    }
}
