"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function makeApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql", credentials: "same-origin" }),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production",
  });
}

