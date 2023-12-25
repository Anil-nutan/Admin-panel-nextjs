"use client";
import React from "react";

import Layout from "../components/layout";
import UsersList from './userList';


export default function Users() {
  return (
    <>
      <Layout>
        <>
          <h2 className="font-bold mb-4">Users</h2>
          <UsersList />
        </>
      </Layout>
    </>
  );
}
