"use client";

import { Status } from "@/components/ui/TableStatusChip";
import { TableStatusDropdown } from "@/components/ui/TableStatusDropdown";
import React from "react";

export function OrderStatusDropdown() {
  const [orderStatus, setOrderStatus] = React.useState<Status>("in transit");

  return (
    <div>
      <TableStatusDropdown status={orderStatus} handleStatus={setOrderStatus} />
    </div>
  );
}
