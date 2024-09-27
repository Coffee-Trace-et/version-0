interface Destination {
  time: string;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  content: string;
  latitude: number;
  longitude: number;
}

interface RecentTransactionsProps {
  destinations: Destination[];
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

// types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Add the role property
}

export type { Destination, RecentTransactionsProps, UserData };
