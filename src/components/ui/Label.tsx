interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  isError?: boolean;
  isRequired?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  label,
  isError,
  isRequired = false,
  ...props
}) => {
  return (
    <label
      className={`block pl-3 text-sm ${
        isError ? "text-red-500" : "text-gray-300"
      }`}
      {...props}
    >
      {label}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );
};
