import axios from "axios";
import { ICustomer } from "../interaces/CustomInterface.js";

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
