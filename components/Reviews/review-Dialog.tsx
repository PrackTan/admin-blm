import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
interface ReviewDialogProps {
  sku: string;
  titleButton: string;
  titleDialog: string;
  descriptionDialog: string;
  name: string;
  comment: string;
  rating: number;
  reply: string;
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const ReviewDialog = ({
  sku,
  titleButton,
  titleDialog,
  descriptionDialog,
  name,
  comment,
  rating,
  reply,
  mode = "edit",
  onSuccess,
}: ReviewDialogProps) => {
  const [replyState, setReplyState] = useState("");
  const [commentState, setCommentState] = useState("");
  const [ratingState, setRatingState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      setReplyState(reply || "");
    } else {
      setReplyState("");
      setCommentState("");
      setRatingState(0);
    }
  }, [reply, mode, open]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}reviews${
        mode === "edit" ? `/${sku}` : ""
      }`;
      const method = mode === "edit" ? "PATCH" : "POST";
      const body =
        mode === "edit"
          ? { reply: replyState }
          : {
              sku,
              comment: commentState,
              rating: ratingState,
            };

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2V2ZXIiLCJlbWFpbCI6ImFuLmxlaG9uZ2RuQGdtYWlsLmNvbSIsIl9pZCI6IjY4MGFlYWUzM2I2N2VlZjg2NzkxZDU0NiIsInJvbGUiOnsiX2lkIjoiNjdjZTgyZWNkNWMxNGE3YWViZjgyY2I4IiwibmFtZSI6IlVTRVIifSwibmFtZSI6Ikjhu5NuZyDDgm4iLCJpYXQiOjE3NDcyODAxMTAsImV4cCI6MTc0NzI4MzcxMH0.Zzvg4N5UNLvMNLJTPCaK2h07G7auPwtzZmzz-Edvi8I`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} review`);
      }

      const data = await response.json();
      console.log(
        `Review ${mode === "edit" ? "updated" : "added"} successfully:`,
        data
      );

      if (onSuccess) {
        onSuccess();
      }

      setOpen(false);
    } catch (error) {
      console.error(
        `Error ${mode === "edit" ? "updating" : "adding"} review:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
          <DialogDescription>{descriptionDialog}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {mode === "edit" ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right col-span-1">Đánh giá</Label>
                <div className="flex flex-col col-span-3">
                  <div className="flex flex-row gap-2">
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p>⭐ {rating}</p>
                  </div>
                  <p>{comment}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reply" className="text-right">
                  Phản hồi
                </Label>
                <Input
                  id="reply"
                  value={replyState}
                  onChange={(e) => setReplyState(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Đánh giá
                </Label>
                <div className="col-span-3 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingState(star)}
                      className="text-2xl"
                    >
                      {star <= ratingState ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comment" className="text-right">
                  Bình luận
                </Label>
                <Input
                  id="comment"
                  value={commentState}
                  onChange={(e) => setCommentState(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
