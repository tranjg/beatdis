"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Song = {
  id: string;
  name: string;
  artist: string;
};

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
];
