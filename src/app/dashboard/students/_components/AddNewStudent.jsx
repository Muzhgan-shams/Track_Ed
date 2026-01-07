"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoaderIcon, LucidePersonStanding } from "lucide-react";

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    GetAllGradesList();
  }, []);
  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades()
      .then((res) => {
        setGrades(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data).then((res) => {
      if (res.data) {
        reset();
        refreshData();
        setLoading(false);
        setOpen(false);
        toast("New Student Added!");
      } else {
        setLoading(false);
      }
    });
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="py-2">
                  <label>Full Name:</label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="py-2">
                  <label>Contact:</label>
                  <Input
                    type="number"
                    placeholder="Enter contact"
                    {...register("contact")}
                  />
                </div>
                <div className="py-2">
                  <label>Address:</label>
                  <Input
                    type="text"
                    placeholder="Enter address"
                    {...register("address")}
                  />
                </div>
                <div className="py-2 flex flex-col">
                  <label>Select Grade:</label>
                  <select
                    className="border border-gray-300 rounded-md p-2 mt-1"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((item) => (
                      <option key={item.id} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 items-center justify-end my-5">
                  <Button type="submit" disabled={loading}>
                    {" "}
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                  <Button onClick={() => setOpen(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
