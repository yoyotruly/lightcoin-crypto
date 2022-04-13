class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((prevValue, { value }) => prevValue + value, 0);
  }

  addTransactions(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) return false;

    this.time = new Date();
    this.account.addTransactions(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance + this.value >= 0);
  }

}


class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}


// DRIVER CODE BELOW
const myAccount = new Account("snow-patrol");

console.log("Starting Balance:", myAccount.balance);

t1 = new Deposit(120.00, myAccount);
console.log(`Transaction result: ${t1.commit()}`);

t2 = new Withdrawal(50, myAccount);
console.log(`Transaction result: ${t2.commit()}`);

t3 = new Withdrawal(80, myAccount);
console.log(`Transaction result: ${t3.commit()}`);

console.log('Ending Balance:', myAccount.balance);
