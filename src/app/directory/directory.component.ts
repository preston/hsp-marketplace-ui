
import { Component, Output, Inject, OnInit } from '@angular/core';

import { Product } from '../product/product';
import { License } from '../license/license';
import { Search } from '../search/search';

import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { ProductService } from '../product/product.service';
import { LicenseService } from '../license/license.service';
import { BackendService } from '../backend/backend.service';
import { ToasterConfigurationService } from '../toaster/toaster.configuration.service';

import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'directory',
	templateUrl: 'directory.component.html',
	styleUrls: ['directory.component.scss'],
	// providers: [CarouselModule]
})
export class DirectoryComponent implements OnInit {

	// The currently selected service, if any.
	product: Product = null;

	products: Array<Product> = new Array<Product>();
	licenses: Array<License> = new Array<License>();

	searchQuery: Search;
	searchMime = {'application/fhir+xml' : false};
	status: Object;

	sidebarActive: boolean = false;

	public toasterConfig = ToasterConfigurationService.TOASTER_CONFIG

	constructor(private backendService: BackendService,
		private productService: ProductService,
		private licenseService: LicenseService,
		private toasterService: ToasterService,
		@Inject('Window') private window: Window) {
	}

	toggleSidebar() {
		this.sidebarActive = !this.sidebarActive;
		console.log("Toggled sidebar: " + this.sidebarActive);
	}

	ngOnInit() {
		this.reload();
	}


	reload() {
		this.searchQuery = new Search();
		this.licenseService.index().subscribe(d => {
			this.licenses = d['results'];
			this.loadInitialProducts();
		});
		this.backendService.status().subscribe(d => {
			this.status = d;
		});
	}

	loadInitialProducts() {
		this.productService.published(this.selectedMimeTypes()).subscribe(d => {
			this.products = d['results'];
		});
	}
	select(product: Product) {
		this.product = product;
	}

	search() {
		if (this.validSearch()) {
			// let mimeTypes: string[] = ;
			this.productService.searchPublished(this.searchQuery.text, this.selectedMimeTypes()).subscribe(d => {
				this.products = d['results'];
			});
		} else {
			this.loadInitialProducts();
		}
	}

	selectedMimeTypes(): string[] {
		let selected = [];
		// console.log("Selecting...");
		for (let [key, value] of Object.entries(this.searchMime)) {
			if (value) {
				selected.push(key);
				// console.log("Selected: " + key);
			}
		}
		return selected;
	}
	validSearch() {
		return this.searchQuery.text.length > 2;
	}

}