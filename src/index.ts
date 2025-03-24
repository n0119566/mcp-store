import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCustomers } from "./api/getAllCustomers.js";
import { ICustomer } from "./interaces/CustomInterface.js";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

// Create server instance
const server = new McpServer({
  name: "store",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-all-customers",
  "Get all customers and their information",
  {},
  async () => {
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
    } catch (error) {
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
  }
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
