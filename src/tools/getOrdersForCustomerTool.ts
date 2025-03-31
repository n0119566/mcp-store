import { getOrdersForCustomerApi } from "../api/CustomersApi.js";

export const getOrdersForCustomerTool = async ({
  customerId,
}: {
  customerId: string;
}) => {
  try {
    const orders = await getOrdersForCustomerApi(customerId);

    if (orders.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No orders found for customer",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(orders, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching orders for customer:", error);
    return {
      content: [
        {
          type: "text" as const,
          text: "Failed to orders for customers",
        },
      ],
    };
  }
};

export default getOrdersForCustomerTool;
