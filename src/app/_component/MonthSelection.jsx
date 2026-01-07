"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalculatorIcon } from "lucide-react";
import { addMonths } from "date-fns";
import { useState } from "react";
import moment from "moment/moment";
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({ onSelectMonth }) => {
  const today = new Date();
  const nextMonths = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonths);
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex gap-2 items-center  " variant="outline">
            {" "}
            <CalculatorIcon className="h-5 w-5" />{" "}
            {moment(month).format("MMMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {" "}
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              // console.log(value);
              onSelectMonth(value);
              setMonth(value);
            }}
            className="rounded-md border shadow-sm w-full"
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
