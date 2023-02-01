/*
 * Component of the events' table.
 * Author: Dániel Májer
 */

import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../../services/get-events.service';
import { Event } from '../../models/event.model';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionStorageHandlerService } from '../../services/session-storage-handler.service';

type TableFilters = {
  type: string;
  location: string;
};

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  cp: number = 1;
  tableData!: Array<Event>;
  rowNumberLimit: number = 20;

  constructor(
    private getEventsService: GetEventsService,
    private cookieService: CookieService,
    private sessionStorageHandler: SessionStorageHandlerService
  ) {}

  /* Get properties of class.
   * @return Array<string>
   * */
  get tableHeaders(): Array<string> {
    return Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.getEventsService.eventArr[0])
    ).slice(2);
  }

  /* Get array of Event objects.
   * @return Array<Event>
   * */
  get events(): Array<Event> {
    return this.getEventsService.eventArr;
  }

  /* Get set of "types" of the Event objects.
   * @return Set<string>
   * */
  get eventTypes(): Set<string> {
    return new Set(
      Array.from(
        this.getEventsService.eventArr.map((e) => {
          return e.type;
        })
      )
    );
  }

  /* Get set of "locations" of the Event objects.
   * @return Set<string>
   * */
  get eventLocations(): Set<string> {
    return new Set(
      Array.from(
        this.getEventsService.eventArr.map((e) => {
          return e.location;
        })
      )
    );
  }

  /* Get username from cookie.
   * @return string
   * */
  get cookieUsername(): string {
    return Object.keys(this.cookieService.getAll())[0];
  }

  /* Get role from cookie.
   * @return string
   * */
  get cookieRole(): string {
    return Object.values(this.cookieService.getAll())[0];
  }

  // Initialize "filterForm" FormGroup for the filters and row number adjustments.
  filterForm: FormGroup = new FormGroup({
    filterByType: new FormControl(
      JSON.parse(sessionStorage['tableFilters']).type,
      []
    ),
    filterByLocation: new FormControl(
      JSON.parse(sessionStorage['tableFilters']).location,
      []
    ),
  });

  /* Update the filters stored with "tableFilters" key in the sessionStorage.
   * @param byValue string
   * @param value string
   * @return void
   * */
  private updateFilterStorage(byValue: string, value: string) {
    let tmp: TableFilters = { type: '', location: '' };

    // Get previous filters. If undefined, initialize one.
    if (sessionStorage['tableFilters'] !== undefined) {
      tmp = JSON.parse(sessionStorage['tableFilters']);
    } else {
      this.sessionStorageHandler.initFilterStorage();
    }

    // Modify requested filter.
    tmp[byValue as keyof TableFilters] = value;

    // Save the modified version of the current filters.
    sessionStorage['tableFilters'] = JSON.stringify(tmp);
  }

  /* Filter Event objects from array by the "byValue" property with the "value" value.
   * @param byValue string
   * @param value string
   * @return void
   * */
  public filterBy(byValue: string, value: string) {
    // Update filters in the sessionStorage.
    this.updateFilterStorage(byValue, value);

    // Reset the component's copy of the table data.
    this.tableData = this.getEventsService.eventArr;

    // Check if all the filter values are empty.
    const areEmptyFilters: Boolean = Object.values(
      JSON.parse(sessionStorage['tableFilters'])
    ).every((item) => !item);

    // If filters are not empty, then start filtering.
    if (!areEmptyFilters) {
      // Get current filters.
      const currentFilters: Array<Array<string>> = Object.entries(
        JSON.parse(sessionStorage['tableFilters'])
      );

      const filtersNum: number = currentFilters.filter(
        (a) => a[1].length !== 0
      ).length;
      // Start filtering and collecting the
      // matching Event objects into the tmpTableData array.
      let tmpTableData: Array<Event> = this.tableData.map((a) => {
        return a;
      });

      // Create a copy, so we don't mutate "tmpTableData" during iteration.
      let tableDataToIter: Array<Event> = this.tableData.map((a) => {
        return a;
      });
      for (const eventObj of tableDataToIter) {
        let matchCounter: number = 0;

        for (const filter of currentFilters) {
          const key: string = filter[0];
          const value: string = filter[1];

          if (value !== '') {
            if (eval(`eventObj.${key}`).toLowerCase() === value.toLowerCase()) {
              matchCounter++;
            }
          }
        }
        console.log({ matchCounter, filtersNum });
        if (matchCounter < filtersNum) {
          const objIndex: number = tmpTableData.indexOf(eventObj);

          if (objIndex !== -1) {
            tmpTableData.splice(objIndex, 1);
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

  /* Gets filters from the sessionStorage and filters the Event objects array
   * applying all of them.
   * @return void
   * */
  public triggerAllFilters() {
    const filters: Array<Array<string>> = Object.entries(
      JSON.parse(sessionStorage['tableFilters'])
    );

    filters.forEach((filter) => {
      const key: string = filter[0];
      const value: string = filter[1];

      this.filterBy(key, value);
    });
  }

  /* Resets the "this.tableData" with the original (unfiltered) array of
   * Event objects from the "GetEventsService" service.
   * @return void
   * */
  public resetFilters() {
    this.tableData = this.getEventsService.eventArr;
  }

  /* Proceeds with the purchase transaction of the user.
   * @param event Event
   * */
  public buyEvent(event: Event) {
    // TODO
  }

  /* Deletes the event from the the "this.getEventsService.eventArr" array of
   * the getEventsService.
   * @param event Event
   * @return void
   * */
  public deleteEvent(event: Event) {
    const eventIndex = this.getEventsService.eventArr.indexOf(event);

    if (eventIndex !== -1) {
      this.getEventsService.eventArr.splice(eventIndex, 1);
    }
  }

  /* Receives a number as an argument, and update the "this.rowNumberLimit"
   * property of this class. This property is used for the view to limit the
   * number of results displayed.
   * @param rowNums number
   * @return void
   * */
  public adjustRowNums(rowNums: number) {
    if (isNaN(rowNums)) {
      throw new Error('Parameter "rowNums" must be numeric value');
    }

    this.rowNumberLimit = rowNums;
  }

  ngOnInit() {
    this.tableData = this.getEventsService.eventArr;
    this.triggerAllFilters();
  }
}
