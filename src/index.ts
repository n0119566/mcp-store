import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCustomersTool } from "./tools/getAllCustomersTool.js";
import { getCustomerByNameTool } from "./tools/getCustomerByNameTool.js";
import { getOrdersForCustomerTool } from "./tools/getOrdersForCustomerTool.js";

// Create server instance
const server = new McpServer({
  name: "store",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Define tool handlers
server.tool(
  "get-all-customers",
  "Get all customers and their information",
  {},
  async () => getAllCustomersTool()
);

server.tool(
  "get-customer-by-name",
  "Find all customers that match a specified name",
  { customerName: z.string().describe("a customer name") },
  async ({ customerName }) => getCustomerByNameTool({ customerName })
);

server.tool(
  "get-all-orders-by-customer",
  "Get all orders for a specific customer",
  { customerId: z.string().describe("a customer id") },
  async ({ customerId }) => getOrdersForCustomerTool({ customerId })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
