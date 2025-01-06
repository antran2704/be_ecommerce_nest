function GetDatabaseDefaultID(prefix: string): string {
  // Get the current date
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  // Generate a random number between 1 and 9999 and format it as a four-digit number
  const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    "0",
  );

  // Concatenate the prefix, date, and random number
  const id = `${prefix}${day}${month}${year}${randomNumber}`;

  return id;
}

export { GetDatabaseDefaultID };
