"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Matcher } from "react-day-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  fromDate?: Date;
  toDate?: Date;
  hidden?: Matcher | Matcher[];
  disabled?: Matcher | Matcher[];
  showOutsideDays?: boolean;
}

export function DatePicker({
  date,
  setDate,
  fromDate,
  toDate,
  hidden,
  disabled,
  showOutsideDays,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, `dd 'de' MMMM 'de' yyyy`, { locale: ptBR })
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={fromDate}
          toDate={toDate}
          hidden={hidden}
          disabled={disabled}
          showOutsideDays={showOutsideDays}
        />
      </PopoverContent>
    </Popover>
  );
}
