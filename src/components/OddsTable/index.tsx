"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OddsTable = ({ odds }: any) => {
  console.log({odds})
  return (
    <Table className="mt-10">
      <TableCaption>All soccer odds</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(odds[0]?.raw_object?.core)?.map(
            (key: any, index: number) => (
              <TableHead key={index}>{key}</TableHead>
            )
          )}
          {Object.keys(odds[0]?.raw_object?.info)?.map(
            (key: any, index: number) => (
              <TableHead key={index}>{key}</TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {odds.map((odd: any, index: number) => {
          return (
            <TableRow key={index}>
              {Object.values(odd?.raw_object?.core)?.map(
                (value: any, index: number) => (
                  <TableHead key={index}>{value}</TableHead>
                )
              )}
              {Object.values(odd?.raw_object?.info)?.map(
                (value: any, index: number) => (
                  <TableHead key={index}>{value}</TableHead>
                )
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OddsTable;
