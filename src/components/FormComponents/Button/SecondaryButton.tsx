const SecondaryButton = ({ children, onClick, disabled, className }: any) => {
  return (
    <button
      className={`rounded-[12px] border border-[#1F2E64] py-3 px-4 min-w-[205px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-[16px] font-[500] leading-6 text-[#1F2E64]">
        {children}
      </span>
    </button>
  );
};

export default SecondaryButton;
