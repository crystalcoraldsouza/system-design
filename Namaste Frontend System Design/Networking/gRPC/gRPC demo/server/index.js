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

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
  {
    id: "sfdjkfjsdf",
    name: "John Doe",
    age: 30,
    address: "123 Main St",
  },
  {
    id: "fw2342df",
    name: "Jane Smith",
    age: 25,
    address: "456 Oak Ave",
  },
  {
    id: "sdf2342",
    name: "Bob Johnson",
    age: 40,
    address: "789 Pine Rd",
  },
];

server.addService(customersProto.CustomerService.service, {
  getAll: (call, callback) => {
    callback(null, { customer: customers });
  },
  get: (call, callback) => {
    const customer = customers.find((c) => c.id === call.request.id);
    if (customer) {
      callback(null, customer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Customer not found",
      });
    }
  },
  insert: (call, callback) => {
    const newCustomer = {
      id: Math.random().toString(36).substring(2, 15),
      name: call.request.name,
      age: call.request.age,
      address: call.request.address,
    };
    customers.push(newCustomer);
    callback(null, newCustomer);
  },
  update: (call, callback) => {
    const index = customers.findIndex((c) => c.id === call.request.id);
    if (index !== -1) {
      customers[index] = {
        id: call.request.id,
        name: call.request.name,
        age: call.request.age,
        address: call.request.address,
      };
      callback(null, customers[index]);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Customer not found",
      });
    }
  },
  remove: (call, callback) => {
    const index = customers.findIndex((c) => c.id === call.request.id);
    if (index !== -1) {
      const removedCustomer = customers.splice(index, 1)[0];
      callback(null, removedCustomer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Customer not found",
      });
    }
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log(`Server bound to port ${port}`);
      server.start();
    }
  },
);
