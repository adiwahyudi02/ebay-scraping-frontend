interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>;
};
