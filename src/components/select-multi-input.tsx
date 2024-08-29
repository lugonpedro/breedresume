"use client";

import { CheckIcon, ChevronsUpDown, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface SelectMultiInputProps {
  placeholder: string;
  options: SelectObjectProps[];
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
}

export function SelectMultiInput({
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SelectMultiInputProps) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={
          disabled
            ? "flex w-full cursor-pointer overflow-hidden rounded-md border border-neutral-200 bg-white opacity-50 px-1 py-2 text-sm ring-offset-white duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-500"
            : "flex w-full cursor-pointer overflow-hidden rounded-md border border-neutral-200 bg-white px-1 py-2 text-sm ring-offset-white duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-500"
        }
        disabled={disabled}
      >
        <div className="data-[state=open]:border-ring relative flex h-10 items-center justify-end rounded-md border">
          <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden px-3 py-1">
            {value?.length > 0 ? (
              options &&
              options
                .filter((option) => value.includes(option.value))
                .map((option) => (
                  <Badge
                    key={option.value}
                    variant="outline"
                    className="m-[2px] gap-1 bg-[#201F2B] pr-0.5 text-white"
                  >
                    <span className="">{option.label}</span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        onChange((oldArray: string[]) =>
                          oldArray.filter((value) => {
                            return value !== option.value;
                          })
                        );
                      }}
                      className="hover:bg-accent flex cursor-pointer items-center rounded-sm px-[1px] hover:text-[#DB1430]"
                    >
                      <X size={12} />
                    </span>
                  </Badge>
                ))
            ) : (
              <span className="mr-auto text-sm">{placeholder}</span>
            )}
          </div>
          <div className="text-muted-foreground/60 flex flex-shrink-0 items-center self-stretch px-1">
            {value?.length > 0 && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  onChange([]);
                }}
                className="flex items-center self-stretch p-2 hover:text-red-500"
              >
                <X size={16} />
              </div>
            )}
            <span className="bg-border mx-0.5 my-2 w-[1px] self-stretch" />
            <div className="hover:text-muted-foreground flex items-center self-stretch p-2">
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Pesquisar..." className="h-9" />
            <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
            <CommandGroup className="h-36 overflow-y-scroll">
              {options.map((option, index) => {
                const isSelected = value.some(
                  (value) => value === option.value
                );
                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      if (isSelected) {
                        onChange((oldArray: string[]) =>
                          oldArray.filter((value: string) => {
                            return value !== option.value;
                          })
                        );
                      } else {
                        onChange((oldArray: string[]) => [
                          ...oldArray,
                          option.value,
                        ]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
