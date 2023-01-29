class Event {

    constructor(name, type, date, location, price) {

        if (name.length >= 50 || name.length === 0 || name === null) {
            throw new Error('Max length of the "name" property is 50 characters.');
        }
        else if (!this.#validateDate(date)) {
            throw new Error('Date cannot be later, than 1 year from current date.');
        } else if (!this.#validateCurrencyIsEuro) {
            throw new Error('The price currency must be "€" (Euro)!');
        }

        this.name = name;
        this.type = type;
        this.date = date;
        this.location = location;
        this.price = price;
    }

    /* Validates the inputDate is not 1 year later, than current date.
     * @input inputDate Date
     * @return Boolean
     * */
    #validateDate(inputDate) {

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
    #validateCurrencyIsEuro(inputPrice) {
        const trimmedInput = inputPrice.trimEnd();
        const lastChar     = inputPrice[trimmedInput.length - 1];
        return (lastChar === '€');
    }

}

