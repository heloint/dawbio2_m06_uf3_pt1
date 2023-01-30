/*
 * "Event" class to represent a event in the application's database.
 * @author Dániel Májer
 * */

export class Event {
    #id: number;
    #name: string;
    #type: string;
    #date: Date;
    #location: string;
    #price: string;

    constructor(id: number, name: string, type: string, date: Date, location: string, price: string) {

        if (name.length >= 50 || name.length === 0 || name === null) {
            throw new Error('Max length of the "name" property is 50 characters.');
        }
        else if (!this.#validateDate(date)) {
            throw new Error('Date cannot be later, than 1 year from current date.');
        } else if (!this.#validateCurrencyIsEuro) {
            throw new Error('The price currency must be "€" (Euro)!');
        }

        this.#id = id;
        this.#name = name;
        this.#type = type;
        this.#date = date;
        this.#location = location;
        this.#price = price;
    }

    /* Validates the inputDate is not 1 year later, than current date.
     * @input inputDate Date
     * @return Boolean
     * */
    #validateDate(inputDate: Date) {

        let resultBool = true;

        let limitDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

        if (inputDate > limitDate) {
            resultBool = false;
        }

        return resultBool;
    }

    /* Validates the inputDate is not 1 year later, than current date.
     * @input inputPrice string
     * @return Boolean
     * */
    #validateCurrencyIsEuro(inputPrice: string) {
        const trimmedInput = inputPrice.trimEnd();
        const lastChar     = inputPrice[trimmedInput.length - 1];
        return (lastChar === '€');
    }

    /* Get id.
     * @return number
     * */
    get id(): number {
        return this.#id;
    }

    /* Get name.
     * @return string
     * */
    get name(): string {
        return this.#name;
    }

    /* Get type.
     * @return string
     * */
    get type(): string {
        return this.#type;
    }

    /* Get date.
     * @return Date
     * */
    get date(): Date {
        return this.#date;
    }

    /* Get location.
     * @return string
     * */
    get location(): string {
        return this.#location;
    }

    /* Get price.
     * @return string
     * */
    get price(): string {
        return this.#price;
    }

    /* Set name.
     * @param name string
     * */
    set name(name: string) {
        if (name.length >= 50 || name.length === 0 || name === null) {
            throw new Error('Max length of the "name" property is 50 characters.');
        }
        this.#name = name;
    }

    /* Set type.
     * @param type string
     * */
    set type(type: string) {
         this.#type = type;
    }

    /* Set date.
     * @param date Date
     * */
    set date(date: Date) {
        if (!this.#validateDate(date)) {
            throw new Error('Date cannot be later, than 1 year from current date.');
        }
        this.#date = date;
    }

    /* Set location.
     * @param location string
     * */
    set location(location: string) {
         this.#location = location;
    }

    /* Set price.
     * @param price string
     * */
    set price(price: string) {
        if (!this.#validateCurrencyIsEuro) {
            throw new Error('The price currency must be "€" (Euro)!');
        }
        this.#price = price;
    }

}
