import { getOrdersForCustomerApi } from "../api/CustomersApi.js";
export const getOrdersForCustomerTool = async ({ customerId, }) => {
    try {
        const orders = await getOrdersForCustomerApi(customerId);
        if (orders.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No orders found for customer",
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(orders, null, 2),
                },
            ],
        };
    }
    catch (error) {
        console.error("Error fetching orders for customer:", error);
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to orders for customers",
                },
            ],
        };
    }
};
export default getOrdersForCustomerTool;
