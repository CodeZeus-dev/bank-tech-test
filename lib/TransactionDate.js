'use strict';

class TransactionDate {
  static transDate;

  static getDate() {
    TransactionDate.#updateDate();
    TransactionDate.#checkDateFormat();
    return TransactionDate.transDate;
  }

  static #updateDate() {
    TransactionDate.transDate = new Date().toLocaleDateString("en-US").split("/");
  }

  static #checkDateFormat() {
    if (TransactionDate.transDate[0].length === 1) {
      TransactionDate.transDate[0] = '0' + TransactionDate.transDate[0];
    }
    if (TransactionDate.transDate[1].length === 1) {
      TransactionDate.transDate[1] = '0' + TransactionDate.transDate[1];
    }
  }
}

module.exports = TransactionDate;