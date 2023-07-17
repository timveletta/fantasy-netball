import React from "react";
import { Alert, AlertDescription } from "./ui/alert";

type ErrorAlertProps = {
  message: string | null;
};

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (message === null) return null;

  return (
    <Alert variant="destructive" className="mb-2">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
