import { gql } from "apollo-server-express";
import { readFileSync } from "fs";

export const content = readFileSync("./src/types/schema.graphql", "utf-8");

export const typeDefs = gql(content);