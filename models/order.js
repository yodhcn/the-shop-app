import dayjs from "dayjs";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return dayjs(this.date).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  }
}

export default Order;
