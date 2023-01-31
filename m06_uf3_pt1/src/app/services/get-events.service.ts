/*
 * Service in charge of serving the available events in the database.
 * @Author Dániel Májer
 * */

import { Injectable, OnInit } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class GetEventsService {
  constructor() {}

  // Initialize and declare variables.
  #eventTypes: string[] = ['concert', 'cinema', 'museum', 'fair'];
  #locations: string[] = [
    'Badalona',
    'Barcelona',
    'Cornellà',
    'Granollers',
    "L'Hospitalet de Llobregat",
    'Manresa',
    'Mataró',
    'Reus',
  ];

  // Generate 100 event objects.
  eventArr: Array<Event> = this.generateEvents(100);

  /* Get random float between range formated as a string with currency sign as last char.
   * @input from number
   * @input to number
   * @input decimals number
   * @return string
   * */
  private getRandomPrice(from: number, to: number, decimals: number): string {
    return `${(Math.random() * (to - from) + from).toFixed(decimals)} €`;
  }

  /* Get random date between range.
   * @input from Date
   * @input to Date
   * @return Date
   * */
  private getRandomDate(from: Date, to: Date): Date {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }

  /* Adds leading digit ("0") if the number has only 1 digit.
   * @num number
   * @return string
   * */
  private addLeadingDigit(num: number): string {
    let result: string = num.toString();
    if (result.length <= 1) {
      result = '0' + result;
    }
    return result;
  }

  /* Generate N users objects.
   * @param number
   * @return Array<Event>
   */
  private generateEvents(userNum: number): Array<Event> {
    let eventArr: Array<Event> = [];

    for (let i = 0; i <= userNum; i++) {
      const iterNum: string = this.addLeadingDigit(i);
      let name: string = `event${iterNum}`;
      let eventType: string =
        this.#eventTypes[Math.floor(Math.random() * this.#eventTypes.length)];
      let date: Date = this.getRandomDate(
        new Date(),
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      );
      let location: string =
        this.#locations[Math.floor(Math.random() * this.#locations.length)];
      let price: string = this.getRandomPrice(0, 100.0, 2);

      eventArr.push(new Event(i, name, eventType, date, location, price));
    }

    return eventArr;
  }

  ngOnInit() {}
}
