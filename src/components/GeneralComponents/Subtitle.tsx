import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

 const Subtitle = ({ children, className = "" }: SubtitleProps) => {
  return (
    <h2 className={`text-2xl font-medium text-black mb-2 ${className}`}>
      {children}
    </h2>
  );
};

export default Subtitle;
