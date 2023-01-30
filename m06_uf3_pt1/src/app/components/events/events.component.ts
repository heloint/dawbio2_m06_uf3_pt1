/*
 * Component of the events' table.
 * Author: Dániel Májer
 */

import { Component, OnInit } from '@angular/core';
import {
  GetEventsService,
} from '../../services/get-events.service';
import { Event } from '../../models/event.model';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup} from '@angular/forms';

type TableFilters = {
    type: string,
    location: string
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    tableData!: Array<Event>;
    rowNumberLimit: number = 20;

    constructor(
        private getEventsService: GetEventsService,
        private cookieService: CookieService
    ) { }

    get tableHeaders(): Array<string> {
        return Object.getOwnPropertyNames(
                    Object.getPrototypeOf(
                        this.getEventsService.eventArr[0]
            )
        ).slice(2);
    }

    get events(): Array<Event> {
        return this.getEventsService.eventArr;
    }
    
    get eventTypes(): Set<string> {
        return new Set(Array.from(this.getEventsService.eventArr.map(e => {
            return e.type
        })));
    }

    get eventLocations(): Set<string> {
        return new Set(Array.from(this.getEventsService.eventArr.map(e => {
            return e.location
        })));
    }

    get cookieUsername() {
        return Object.keys(this.cookieService.getAll())[0];
    }

    get cookieRole() {
        return Object.values(this.cookieService.getAll())[0];
    }

    filterForm: FormGroup = new FormGroup({
      filterByType: new FormControl(JSON.parse(sessionStorage['tableFilters']).type, []),
      filterByLocation: new FormControl(JSON.parse(sessionStorage['tableFilters']).location, []),
      rowNums: new FormControl(this.rowNumberLimit, []),
    });

    private updateFilterStorage(byValue: string, value: string) {

        let tmp: TableFilters = {type: '', location: ''};

        // Get previous filters. If undefined, initialize one.
        if (sessionStorage['tableFilters'] !== undefined) {
            tmp = JSON.parse(sessionStorage['tableFilters']);
        } else {
            this.initFilterStorage();
        }

        // Modify requested filter.
        tmp[byValue as keyof TableFilters] = value;

        // Save the modified version of the current filters.
        sessionStorage['tableFilters'] = JSON.stringify(tmp);

    }

    public filterBy(byValue: string, value: string) {
        
        // Update filters in the sessionStorage.
        this.updateFilterStorage(byValue, value);

        // Reset the component's copy of the table data.
        this.tableData = this.getEventsService.eventArr;
        
        // Check if all the filter values are empty.
        const areEmptyFilters: Boolean = 
            Object.values(JSON.parse(sessionStorage['tableFilters'])).every(item => !item)

        // If filters are not empty, then start filtering.
        if ( !areEmptyFilters) {

            // Get current filters.
            const currentFilters: Array<Array<string>> = 
                Object.entries(JSON.parse(sessionStorage['tableFilters']));

            // Start filtering and collecting the 
            // matching Event objects into the tmpTableData array.
            let tmpTableData: Array<Event> = this.tableData;
            let tableDataToIter: Array<Event> = structuredClone(tmpTableData);
            for(const filter of currentFilters) {
                const key: string = filter[0];
                const value: string = filter[1];

                if (value !== '') {
                    for(const eventObj of tableDataToIter) {
                        if (eval(`eventObj.${key}`).toLowerCase() !== value.toLowerCase()) {
                            const objIndex: number = tmpTableData
                            tmpTableData.push(eventObj);
                        }
                    }
                }
            }

            // Reassign the filtered array of Event objects.
            this.tableData = tmpTableData;
        } else {
            // If the filters are empty, then reset the table.
            this.tableData = this.getEventsService.eventArr;
        }
    }

    public triggerAllFilters() {
        const filters: Array<Array<string>> = 
            Object.entries(JSON.parse(sessionStorage['tableFilters']));

        filters.forEach((filter) => {
            const key: string = filter[0];
            const value: string = filter[1];

            this.filterBy(key, value);
        });
    }

    public resetFilters() {
        this.tableData = this.getEventsService.eventArr;
    }

    public buyEvent(event: Event) {
        // TODO
    }

    public deleteEvent(event: Event) {
        const eventIndex = this.getEventsService.eventArr.indexOf(event);

        if (eventIndex !== -1) {
            this.getEventsService.eventArr.splice(eventIndex, 1);
        }
    }


    public adjustRowNums(rowNums: number) {

        if (isNaN(rowNums)) {
            throw new Error('Parameter "rowNums" must be numeric value');
        }

        this.rowNumberLimit = rowNums;
    }

    private initFilterStorage() {
        let currentTableFilters: TableFilters = {type:'', location: ''};

        // Initialize 'tableFilter' TableFilters type object in sessionStorage.
        if (!Object.keys(sessionStorage).includes('tableFilters')){
            sessionStorage['tableFilters'] = JSON.stringify(currentTableFilters);
        } else {
            currentTableFilters = JSON.parse(sessionStorage['tableFilters']);
        }
    }

   ngOnInit() {
       this.tableData = this.getEventsService.eventArr;
       this.triggerAllFilters();

       this.initFilterStorage();
   }

}
