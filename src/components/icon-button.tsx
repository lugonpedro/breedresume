import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"div"> {}

export function IconButton(props: IconButtonProps) {
  return (
    <div
      {...props}
      className={
        props.className
          ? `${props.className} cursor-pointer w-max h-max rounded-full p-2`
          : "cursor-pointer bg-secondary w-max h-max rounded-full p-2"
      }
    >
      {props.children}
    </div>
  );
}
