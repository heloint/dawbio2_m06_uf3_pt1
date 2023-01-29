import { Component, OnInit } from '@angular/core';
import {
  GetEventsService,
} from '../../services/get-events.service';
import { Event } from '../../models/event.model';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup} from '@angular/forms';

interface TableFilters {
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
      filterByType: new FormControl('', []),
      filterByLocation: new FormControl('', []),
    });


    public filterBy(byValue: string, value: string) {

        // Get previous filters.
        let tmp = JSON.parse(sessionStorage['tableFilters']);

        // Modify requested filter.
        tmp[byValue] = value;

        // Save the modified version of the current filters.
        sessionStorage['tableFilters'] = JSON.stringify(tmp);

        // Reset the component's copy of the table data.
        this.tableData = this.getEventsService.eventArr;

        // Init vars in this scope.
        let tmpKey: any;
        let tmpValue: any;

        // Start the refiltration.
        Object.entries(tmp).forEach((pair) => {
            tmpKey = pair[0];
            tmpValue = pair[1];

            this.tableData = this.tableData.filter(e => {

                console.log(tmpKey);
                console.log(tmpValue);
                if (eval(`e.${tmpKey}`) === tmpValue) {
                    return e;
                }
                return;
            });
        });
    }

    public filterEventsByType(type: string) {

        sessionStorage['typeFilter'] = type;

        if (type !== '') {
            this.tableData = this.getEventsService.eventArr.filter(e => {
                    if (e.type === type) {
                        return e;
                    }
                    return;
                });
        } else if (sessionStorage['locationFilter'] !== '') {
            this.filterEventsByLocation(sessionStorage['locationFilter']);
        } else {
            this.tableData = this.getEventsService.eventArr;
        }

    }

    public filterEventsByLocation(location: string) {
        sessionStorage['locationFilter'] = location;

        if (location !== '') {
            this.tableData = this.getEventsService.eventArr.filter(e => {
                    if (e.location === location) {
                        return e;
                    }
                    return;
                });
        } else if (sessionStorage['typeFilter'] !== '') {
            this.filterEventsByType(sessionStorage['typeFilter']);
        } else {
            this.tableData = this.getEventsService.eventArr;
        }
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


       this.initFilterStorage();

   }
}
