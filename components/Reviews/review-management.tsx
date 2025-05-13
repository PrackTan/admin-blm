"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Check,
  X,
  Reply,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReviewsTableProps {
  limit?: number;
  data: Review[];
  title?: string;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onReply?: (id: string, reply: string) => Promise<void>;
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

const ReviewsTable = ({
  data,
  title = "Customer Reviews",
  limit,
  onDelete,
  onView,
  onReply,
}: ReviewsTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = limit || 10;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (review: Review) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedReview && onDelete) {
      onDelete(selectedReview._id);
    }
    setDeleteDialogOpen(false);
  };

  const handleReplyClick = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
    setReplyDialogOpen(true);
  };

  const handleReplySubmit = async () => {
    if (selectedReview && onReply) {
      setIsSubmitting(true);
      try {
        await onReply(selectedReview._id, replyText);
        setReplyDialogOpen(false);
      } catch (error) {
        console.error("Failed to submit reply:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>
              Showing {paginatedData.length} of {data.length} reviews
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900">
              <TableRow>
                <TableHead className="w-[180px]">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((review) => (
                  <TableRow
                    key={review._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold">{review.username}</span>
                        <span className="text-xs text-muted-foreground">
                          SKU: {review.sku.substring(0, 8)}...
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {renderStars(review.rating)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px]">
                      <div className="truncate">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="truncate">{review.comment}</p>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-md">
                              <p>{review.comment}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      {review.reply && (
                        <div className="flex items-center mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate">
                                  Reply: {review.reply.substring(0, 20)}...
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className="max-w-md"
                              >
                                <p>{review.reply}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-col gap-1">
                        {review.isBought && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 flex items-center w-fit"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                        {review.isDeleted && (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 flex items-center w-fit"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Deleted
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span>{formatDate(review.createdAt)}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(review.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 flex items-center text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          onClick={() => handleReplyClick(review)}
                        >
                          <Reply className="mr-1 h-3 w-3" />
                          <span className="hidden sm:inline">
                            {review.reply ? "Edit Reply" : "Reply"}
                          </span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onView && onView(review._id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <Link href={`/posts/edit/${review.sku}`} passHref>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDeleteClick(review)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No reviews found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review from{" "}
              {selectedReview?.username}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {replyText ? "Edit Reply" : "Reply to Review"}
            </DialogTitle>
            <DialogDescription>
              {selectedReview && (
                <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {selectedReview.username}
                    </span>
                    {renderStars(selectedReview.rating)}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {selectedReview.comment}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReplySubmit}
              disabled={isSubmitting || !replyText.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting
                ? "Submitting..."
                : replyText
                ? "Update Reply"
                : "Submit Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReviewsTable;
