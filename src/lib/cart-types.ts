import type { BoardSelection } from "./catalog";

export type CartItem =
  | { kind: "product"; id: string; slug: string; qty: number }
  | { kind: "board"; id: string; selection: BoardSelection; qty: number };
