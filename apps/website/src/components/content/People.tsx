import { type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";

import { classes } from "@/utils/classes";

import Heading from "./Heading";

type PeopleProps = {
  people: Record<
    string,
    {
      image: ImageProps["src"];
      name: string;
      title: string;
      description: ReactNode;
    }
  >;
  columns?: 1 | 2;
  align?: "left" | "center";
};

const People = ({ people, columns = 1, align = "left" }: PeopleProps) => (
  <ul
    className={classes(
      "flex flex-wrap",
      ...(columns === 1
        ? []
        : [
            "md:-m-4 md:items-start",
            align === "center" && "md:justify-center",
          ]),
    )}
  >
    {Object.entries(people).map(([key, person]) => (
      <li
        key={key}
        className={classes(
          "flex basis-full flex-col",
          ...(columns === 1
            ? ["md:flex-row"]
            : [
                "md:basis-1/2 md:p-4",
                align === "center" && "items-center text-center",
              ]),
        )}
      >
        <div
          className={classes(
            "my-auto w-full max-w-xs flex-shrink-0 p-4",
            align === "center" && "mx-auto",
          )}
        >
          <Image
            src={person.image}
            width={320}
            alt=""
            className="aspect-square h-auto w-full rounded-2xl bg-alveus-green object-cover"
          />
        </div>
        <div
          className={classes(
            "my-auto flex-grow p-4",
            columns === 1 && align === "center" && "text-center",
          )}
        >
          <Heading level={2} className="mt-0 text-4xl">
            {person.name}
          </Heading>
          <Heading level={3} className="text-xl">
            {person.title}
          </Heading>
          <div className="flex flex-col gap-4 text-gray-500">
            {person.description}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default People;
