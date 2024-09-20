export const getGradeColor = (
  grade: string | undefined | null,
  defaultValue: string,
): string => {
  return ["10", "9", "a", "a-", "a+"].includes(grade?.toLowerCase() || "")
    ? "text-utility-success-700"
    : ["8", "7", "b", "b-", "b+"].includes(grade?.toLowerCase() || "")
      ? "text-utility-success-500"
      : ["6", "5", "c", "c-", "c+"].includes(grade?.toLowerCase() || "")
        ? "text-utility-warning-500"
        : [
              "4",
              "3",
              "2",
              "1",
              "0",
              "d",
              "d-",
              "d+",
              "e",
              "e+",
              "e-",
              "f",
              "f+",
              "f-",
            ].includes(grade?.toLowerCase() || "")
          ? "text-utility-error-500"
          : defaultValue;
};
