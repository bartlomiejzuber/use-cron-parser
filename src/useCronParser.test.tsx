import * as React from "react";

import { renderHook, act } from "@testing-library/react-hooks";

import { useCronParser } from "./useCronParser";

describe("useCronParser", () => {
  const originalDateImpl = global.Date;

  afterEach(() => {
    global.Date = originalDateImpl;
  });

  describe("asterisk tests", () => {
    beforeEach(() => {
      jest
        .spyOn(global, "Date")
        .mockImplementation((...args) => new originalDateImpl(...args) as any);
    });

    afterEach(() => {
      global.Date = originalDateImpl;
    });

    it("* * * * * - next occurrence should be within 1 second", () => {
      const date = new Date();
      const prevSeconds = date.getSeconds();
      jest.spyOn(global, "Date").mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("* * * * *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(prevSeconds + 1);
    });

    it("10 * * * * - next occurrence should be set to next minute 10 seconds", () => {
      const date = new Date();
      date.setSeconds(20); // set seconds after 10 seconds so it should be next minute 10 seconds
      const prevMinutes = date.getMinutes();

      jest.spyOn(global, "Date").mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("10 * * * *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(10);
      expect(value.getMinutes()).toBe(prevMinutes + 1);
    });

    it("10 * * * * - next occurrence should be set to same minute 10 seconds", () => {
      const date = new Date();
      date.setSeconds(5); // set seconds before 10 seconds so it should be same minute 10 seconds
      date.setMinutes(10);
      const prevMinutes = date.getMinutes();

      jest.spyOn(global, "Date").mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("10 * * * *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(10);
      expect(value.getMinutes()).toBe(prevMinutes);
    });

    it("* 10 * * * - two next occurrences should be set to 6 and 7 seconds after 10 minutes", () => {
      const date = new Date();
      date.setSeconds(5);

      const spy = jest
        .spyOn(global, "Date")
        .mockImplementation(() => date as any);
      const { result } = renderHook(() => useCronParser("* 10 * * *"));
      const generator = result.current;

      const first = generator.next();

      expect(first.value.getSeconds()).toBe(6);
      expect(first.value.getMinutes()).toBe(10);

      spy.mockRestore();
      const second = generator.next();
      expect(second.value.getSeconds()).toBe(7);
      expect(second.value.getMinutes()).toBe(10);
    });
  });

  describe("mixed tests", () => {
    beforeEach(() => {
      jest
        .spyOn(global, "Date")
        .mockImplementation((...args) => new originalDateImpl(...args) as any);
    });

    afterEach(() => {
      global.Date = originalDateImpl;
    });

    it("10 * 1 * * - next occurrence should be set to same hour but next minute", () => {
      const date = new Date();
      date.setSeconds(15);
      date.setMinutes(10);
      date.setHours(1);
      const prevMinutes = date.getMinutes();

      jest.spyOn(global, "Date").mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("10 * 1 * *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(10);
      expect(value.getMinutes()).toBe(prevMinutes + 1);
      expect(value.getHours()).toBe(1);
    });

    it("0 1 4 * * - next occurrence should be set to 4:01 am next day", () => {
      const date = new Date();
      date.setSeconds(10);
      date.setMinutes(5);
      date.setHours(5);
      const currentDay = date.getDay();

      jest.spyOn(global, "Date").mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("0 1 4 * *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(0);
      expect(value.getMinutes()).toBe(1);
      expect(value.getHours()).toBe(4);
      expect(value.getDay()).toBe(currentDay + 1);
    });

    it("0 0 7 31 * - next occurrence should be set to 7:00 31th day of current month", () => {
      const date = new Date();
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(7);
      date.setDate(2);
      date.setMonth(4); // setting month to May as May has 31 days

      jest
        .spyOn(global, "Date")
        .mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("0 0 7 31 *"));
      const generator = result.current;

      const { value } = generator.next();

      expect(value.getSeconds()).toBe(0);
      expect(value.getMinutes()).toBe(0);
      expect(value.getHours()).toBe(7);
      expect(value.getDate()).toBe(31);
    });

    it("0 0 7 31 * - next occurrence should be set to 7:00 31th day of next month which has 31 days", () => {
      const date = new Date();
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(7);
      date.setDate(2);
      date.setMonth(1); // setting February as it never have 31 days - next month March has 31 days

      jest
        .spyOn(global, "Date")
        .mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("0 0 7 31 *"));
      const generator = result.current;

      const first = generator.next();

      expect(first.value.getSeconds()).toBe(0);
      expect(first.value.getMinutes()).toBe(0);
      expect(first.value.getHours()).toBe(7);
      expect(first.value.getDate()).toBe(31);
      expect(first.value.getMonth()).toBe(2);

      const second = generator.next();
      expect(second.value.getSeconds()).toBe(0);
      expect(second.value.getMinutes()).toBe(0);
      expect(second.value.getHours()).toBe(7);
      expect(second.value.getDate()).toBe(31);
      expect(second.value.getMonth()).toBe(4);
    });

    it("5 4 * * * - At 04:05", () => {
      const date = new Date();
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(1);
      date.setDate(15);
      date.setMonth(10); // setting February as it never have 31 days - next month March has 31 days

      jest
        .spyOn(global, "Date")
        .mockImplementationOnce(() => date as any);
      const { result } = renderHook(() => useCronParser("0 5 4 * *"));
      const generator = result.current;

      const first = generator.next();

      expect(first.value.getSeconds()).toBe(0);
      expect(first.value.getMinutes()).toBe(5);
      expect(first.value.getHours()).toBe(4);
      expect(first.value.getDate()).toBe(date.getDate());
      expect(first.value.getMonth()).toBe(date.getMonth());

      const second = generator.next();
      expect(second.value.getSeconds()).toBe(0);
      expect(second.value.getMinutes()).toBe(5);
      expect(second.value.getHours()).toBe(4);
      expect(second.value.getDate()).toBe(date.getDate() + 1);
      expect(second.value.getMonth()).toBe(date.getMonth());
    });
  });
});
