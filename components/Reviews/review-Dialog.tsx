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
import { useState } from "react";
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
}: ReviewDialogProps) => {
  const [replyState, setReplyState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}reviews/${sku}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            reply: replyState,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2V2ZXIiLCJlbWFpbCI6ImFuLmxlaG9uZ2RuQGdtYWlsLmNvbSIsIl9pZCI6IjY4MGFlYWUzM2I2N2VlZjg2NzkxZDU0NiIsInJvbGUiOnsiX2lkIjoiNjdjZTgyZWNkNWMxNGE3YWViZjgyY2I4IiwibmFtZSI6IlVTRVIifSwibmFtZSI6Ikjhu5NuZyDDgm4iLCJpYXQiOjE3NDcyODAxMTAsImV4cCI6MTc0NzI4MzcxMH0.Zzvg4N5UNLvMNLJTPCaK2h07G7auPwtzZmzz-Edvi8I`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      const data = await response.json();
      console.log("Reply updated successfully:", data);
    } catch (error) {
      console.error("Error updating reply:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{titleButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
          <DialogDescription>{descriptionDialog}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
