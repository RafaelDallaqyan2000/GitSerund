import React from "react";
import { Header } from "./components";
import { Body } from "./components/Body";
import "./Table.css";

export function Table({ onItemClick, items }) {
  return (
    <table className="table-content">
      <Header />
      <Body onItemClick={onItemClick} items={items} />
    </table>
  );
}
