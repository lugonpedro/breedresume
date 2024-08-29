import { CheckIcon, ChevronsUpDown, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                    className="m-[2px] gap-1 bg-secondary pr-0.5 text-primary"
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
                      className="hover:bg-accent flex cursor-pointer items-center rounded-sm px-[1px] hover:text-destructive"
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
                className="flex items-center self-stretch p-2 hover:text-destructive"
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
              <CommandList>
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
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
