import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = join(__dirname, "../customers.proto");
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const CustomerService = grpc.loadPackageDefinition(packageDefinition);
export const client = new CustomerService.CustomerService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure(),
);
