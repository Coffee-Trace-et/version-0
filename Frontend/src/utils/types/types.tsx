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
export type { Destination, RecentTransactionsProps };
