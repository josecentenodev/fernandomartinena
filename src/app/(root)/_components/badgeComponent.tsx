import { Badge } from "@mantine/core";
import React from "react";

interface BadgeProps {
  createdAt: Date;
}

function isRecent(createdAt: Date): boolean {
  const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();
  return now.getTime() - createdAt.getTime() <= SEVEN_DAYS_IN_MS;
}

const BadgeComponent: React.FC<BadgeProps> = ({ createdAt }) => {
  return isRecent(createdAt) ? <Badge color="pink">New</Badge> : null;
};

export default BadgeComponent;
