import axios from "axios";
import { ICustomer } from "../interaces/CustomInterface.js";
import { IOrder } from "../interaces/OrderInterface.js";

export async function getAllCustomers(): Promise<ICustomer[]> {
  try {
    const { data } = await axios.get<ICustomer[]>(
      "http://localhost:3000/api/customers/"
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOrdersForCustomer(
  customerId: string
): Promise<IOrder[]> {
  try {
    const { data } = await axios.get<IOrder[]>(
      `http://localhost:3000/api/customers/${customerId}/orders`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCustomerByName(
  customerName: string
): Promise<ICustomer[]> {
  try {
    const { data } = await axios.get<ICustomer[]>(
      `http://localhost:3000/api/customers?name=${customerName}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
