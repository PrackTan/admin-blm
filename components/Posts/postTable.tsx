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
interface PostTableProps {
  limit?: number;
  data: Review[];
  title: string;
}
interface Review {
  _id: string;
  comment: string;
  rating: number;
  reply: string;
  sku: string;
  isBought: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
  username: string;
  createBy: {
    _id: string;
    name: string;
  };
}

const PostTable = ({ data, title, limit }: PostTableProps) => {
  console.log("data", data);
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Reviews"}
        </h3>
        <Table>
          <TableCaption> Reviews</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Comment</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Created At
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((review, index) => (
              <TableRow key={index}>
                <TableCell>{review.comment}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {review.username}
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">
                  123123
                </TableCell>
                <TableCell>
                  <Link href={`/posts/edit/${review._id}`}>
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
