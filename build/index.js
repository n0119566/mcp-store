import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCustomers, getCustomerByName, getOrdersForCustomer, } from "./api/CustomersApi.js";
// Create server instance
const server = new McpServer({
    name: "store",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool("get-all-customers", "Get all customers and their information", {}, async () => {
    try {
        const customers = await getAllCustomers();
        if (customers.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No customers found",
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(customers, null, 2),
                },
            ],
        };
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to retrieve customers",
                },
            ],
        };
    }
});
server.tool("get-customer-by-name", "Find all customers that match a specified name", { customerName: z.string().describe("a customer name") }, async ({ customerName }) => {
    try {
        const customers = await getCustomerByName(customerName);
        if (customers.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No customers found for that name",
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(customers, null, 2),
                },
            ],
        };
    }
    catch (error) {
        console.error("Error fetching customers by name:", error);
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to get customers by name",
                },
            ],
        };
    }
});
server.tool("get-all-orders-by-customer", "Get all orders for a specific customer", { customerId: z.string().describe("a customer id") }, async ({ customerId }) => {
    try {
        const orders = await getOrdersForCustomer(customerId);
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
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
