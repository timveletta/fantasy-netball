import { Position } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  return array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}

export function retry<T>(fn: () => Promise<T>, retries: number = 5): Promise<T> {
  return fn().catch(async (error) => {
    if (retries > 0) {
      await wait(1000);
      return retry(fn, retries - 1);
    }
    throw error;
  });
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatPosition(position: Position) {
  switch (position) {
    case Position.GK:
      return "Goal Keeper";
    case Position.GD:
      return "Goal Defence";
    case Position.WD:
      return "Wing Defence";
    case Position.C:
      return "Center";
    case Position.WA:
      return "Wing Attack";
    case Position.GA:
      return "Goal Attack";
    case Position.GS:
      return "Goal Shooter";
    case Position.BENCH:
      return "-";
  }
}
