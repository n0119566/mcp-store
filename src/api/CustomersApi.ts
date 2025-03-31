import axios from "axios";
import { ICustomer } from "../interaces/CustomInterface.js";
import { IOrder } from "../interaces/OrderInterface.js";

export async function getAllCustomersApi(): Promise<ICustomer[]> {
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

export async function getOrdersForCustomerApi(
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

export async function getCustomerByNameApi(
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
