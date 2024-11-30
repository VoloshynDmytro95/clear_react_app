import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className = "" }: TitleProps) => {
  return (
    <h1 className={`text-4xl font-bold text-black mb-4 ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
