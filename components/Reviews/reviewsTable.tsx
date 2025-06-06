"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import ReviewDialog from "./review-Dialog";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import ReviewsPagination from "./reviewsPagination"; // Import the pagination component
import usePagedReviews from "@/hooks/usePageReivews";
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

const ReviewsTable = ({ data, title, limit = 10 }: PostTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(data.length / limit));

  /* các item hiển thị trên trang hiện tại */
  const currentReviews = useMemo(() => {
    const first = (currentPage - 1) * limit;
    return data.slice(first, first + limit);
  }, [data, currentPage, limit]);
  const format = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [newReview, setNewReview] = useState({
    sku: "",
    comment: "",
    rating: 0,
  });

  // Calculate the index of the first and last review on the current page

  const handleAddReview = () => {
    const postReview = async () => {
      try {
        const response = await useFetch({
          endpoint: "http://localhost:8080/api/v1/reviews",
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          },
        });
        if (!response) {
          throw new Error("Failed to post review");
        }
        const result = response.data;
        console.log("Review posted successfully:", result);
        alert("🟢 Review posted successfully!");
        window.location.reload(); // refresh danh sách review
      } catch (error) {
        console.error("Failed to post review:", error);
        alert("🔴 Failed to post review!");
      }
    };

    postReview();
  };

  const handleAddFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx";

    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/reviews/import-excel",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        console.log("Import result:", result);

        alert("🟢 Import thành công!");
        window.location.reload(); // refresh danh sách review
      } catch (error) {
        console.error("Import failed:", error);
        alert("🔴 Import thất bại!");
      }
    };

    input.click(); // mở hộp thoại chọn file
  };

  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Reviews"}
        </h3>
        <div className="mb-4 flex gap-2">
          <Button onClick={handleAddReview} className="bg-blue-500 text-white">
            Add Review
          </Button>
          <Button onClick={handleAddFile} className="bg-green-500 text-white">
            Add File
          </Button>
        </div>
        <Table className="border-collapse border border-gray-300">
          <TableCaption> Reviews</TableCaption>
          <TableHeader className="bg-gray-300">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead className="hidden md:table-cell">Comment</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Created At
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReviews?.map((review, index) => (
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
                  <ReviewDialog
                    sku={review.sku}
                    titleButton="Edit"
                    titleDialog="Edit Review"
                    descriptionDialog="Edit the review"
                    name={review.username}
                    comment={review.comment}
                    rating={review.rating}
                    reply={review.reply}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ReviewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ReviewsTable;
