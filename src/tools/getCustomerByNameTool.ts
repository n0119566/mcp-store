import { getCustomerByNameApi } from "../api/CustomersApi.js";

export const getCustomerByNameTool = async ({
  customerName,
}: {
  customerName: string;
}) => {
  try {
    const customers = await getCustomerByNameApi(customerName);

    if (customers.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No customers found for that name",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(customers, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching customers by name:", error);
    return {
      content: [
        {
          type: "text" as const,
          text: "Failed to get customers by name",
        },
      ],
    };
  }
};

export default getCustomerByNameTool;
