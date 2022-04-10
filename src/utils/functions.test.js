import { createArray, fetchPageNumbers } from "./functions";

test("create array function works properly", () => {
  const customArray = createArray(3, 6, 1);
  expect(customArray).toHaveLength(4);
  expect(customArray[0]).toBe(3);
  expect(customArray[customArray.length - 1]).toBe(6);
});

test("fetchPageNumbers function works properly first pages", () => {
  const pages = fetchPageNumbers(30, 1);
  // [1, 2, 3, 4, 5, "RIGHT", 30]
  expect(pages).toHaveLength(7);
  expect(pages[0]).toBe(1);
  expect(pages[pages.length - 2]).toBe("RIGHT");
  expect(pages[pages.length - 1]).toBe(30);
});

test("fetchPageNumbers function works properly latest pages", () => {
  const pages = fetchPageNumbers(30, 29);
  // [1, "LEFT", 26, 27, 28, 29, 30]
  expect(pages).toHaveLength(7);
  expect(pages[0]).toBe(1);
  expect(pages[1]).toBe("LEFT");
  expect(pages[pages.length - 1]).toBe(30);
});

test("fetchPageNumbers function works properly middle pages", () => {
  const pages = fetchPageNumbers(30, 15);
  // [1, "LEFT", 14, 15, 16, "RIGHT", 30]
  expect(pages).toHaveLength(7);
  expect(pages[0]).toBe(1);
  expect(pages[1]).toBe("LEFT");
  expect(pages[pages.length - 2]).toBe("RIGHT");
  expect(pages[pages.length - 1]).toBe(30);
});
