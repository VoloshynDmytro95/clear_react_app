const Button = ({ children, onClick, disabled, className }: any) => {
  return (
    <button
      className={`rounded-[12px] bg-[#1F2E64] py-3 px-4 min-w-[205px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-[16px] font-[500] leading-6 text-white">
        {children}
      </span>
    </button>
  );
};

export default Button;
