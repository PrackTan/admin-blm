import React from "react";
import { Post } from "@/types/post";
import { FaStar } from "react-icons/fa6";
import { BsFillChatRightQuoteFill } from "react-icons/bs";

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

const ReviewsTable = ({ data, title, limit }: PostTableProps) => {
  console.log("data", data);
  const format = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Reviews"}
        </h3>
        <Table className="border-collapse border border-gray-300">
          <TableCaption> Reviews</TableCaption>
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Comment</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Created At
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((review, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {review.username}
                    </span>
                    <span className="text-xs text-gray-500">{review.sku}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < review.rating ? "gold" : "gray"}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {review.comment}
                    </span>
                    <span className="flex flex-row items-center text-green-600 gap-1 text-xs text-gray-500">
                      <BsFillChatRightQuoteFill />
                      {review.reply}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">
                  {format(review.createdAt)}
                </TableCell>
                <TableCell>
                  <Link href={`/posts/edit/${review.sku}`}>
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

export default ReviewsTable;
