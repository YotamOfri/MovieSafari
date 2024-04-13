import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatDate(inputDate) {
  // Convert input string to a Date object
  var date = new Date(inputDate);

  // Define an array for month names
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get year, month, and day from the Date object
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  // Adjust the date to Feb 27, 2024
  date.setDate(date.getDate() - 3);

  // Get the adjusted month and day
  var adjustedMonth = date.getMonth();
  var adjustedDay = date.getDate();

  // Construct the formatted date string
  var formattedDate =
    monthNames[adjustedMonth] + " " + adjustedDay + ", " + year;

  return formattedDate;
}
export function updateUrlParams(url) {
  window.history.pushState(null, "", url);
}
