function BoxWrapper({ children, onclick, className }) {
    return (
      <div
        onClick={onclick}
        className={`${className} gap-1  bg-cover bg-center  rounded-md p-4 flex cursor-pointer px-3   hover:scale-105  hover:z-10  transition-all ease-in-out duration-300  `}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        }}>
        {children}
      </div>
    );
  }

  export default BoxWrapper;