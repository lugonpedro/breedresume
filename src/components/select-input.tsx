"use client";

import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

interface SelectInputProps {
  placeholder: string;
  options: SelectObjectProps[];
  value: string | number;
  onChange: (option: any) => void;
  disabled?: boolean;
}

export function SelectInput({
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SelectInputProps) {
  const [popover, setPopover] = useState<boolean>(false);

  return (
    <Popover open={popover}>
      <PopoverTrigger
        asChild
        className="flex w-full overflow-hidden rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
      >
        <Button
          variant="outline"
          role="combobox"
          className="justify-between"
          onClick={() => setPopover(!popover)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command
            filter={(value, search) => {
              const option = options.find((opt) => opt.value === value);
              if (option!.label.toLowerCase().includes(search.toLowerCase())) {
                return 1;
              }
              return 0;
            }}
          >
            <CommandInput placeholder="Pesquisar..." className="h-9" />
            <CommandGroup className="h-36 overflow-y-scroll">
              <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(option.value === value ? "" : currentValue);
                    setPopover(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
