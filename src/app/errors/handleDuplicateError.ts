/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate error",
    errorSources,
  };
};

export default handleDuplicateError;
