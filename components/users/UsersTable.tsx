import React from "react";
import { Post } from "@/types/post";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface ClientTableProps {
  limit?: number;
  data: Review[];
  title: string;
}
interface Review {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  other: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const PostTable = ({ data, title, limit }: ClientTableProps) => {
  console.log("data", data);
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Users"}
        </h3>
        <Table>
          <TableCaption> Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Other</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.phone}
                </TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.other}</TableCell>
                <TableCell>
                  <Link href={`/users/edit/${user._id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PostTable;
