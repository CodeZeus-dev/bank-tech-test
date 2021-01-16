'use strict';

class TransactionDate {
  static transDate;

  static getDate() {
    TransactionDate.#updateDate();
    return TransactionDate.transDate;
  }

  static #updateDate() {
    TransactionDate.transDate = new Date().toLocaleDateString("GR");
  }

}

module.exports = TransactionDate;