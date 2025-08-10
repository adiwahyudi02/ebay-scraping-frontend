import Image from "next/image";
import React from "react";

interface IIllustrationProps {
  title?: string;
  message?: string;
  imageSrc?: string;
}

export const Illustration: React.FC<IIllustrationProps> = ({
  imageSrc,
  title,
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Illustration image"
          width={400}
          height={300}
        />
      )}
      <div>
        {title && <p className="text-2xl font-semibold">{title}</p>}
        {message && <p className="text-gray-500">{message}</p>}
      </div>
    </div>
  );
};
