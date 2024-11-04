const Modal = ({ status, children, closeModal, title }) => {
  console.log(status);
  return (
    <>
      <div
        className={
          status
            ? "flex fixed z-50 max-lg:px-2 px-40 pt-20 pb-28 w-full h-full left-0 top-0 bg-black bg-opacity-50"
            : "hidden"
        }
      >
        <div className="flex w-full max-lg:h-auto max-lg:max-h-fit overflow-auto flex-col max-sm:px-0 px-2 rounded-md bg-white h-full">
          <div className="flex w-full flex-row">
            <span className="w-full flex h-0 justify-start">{title}</span>
            <span className="flex justify-end p-1">
              <button className="flex w-full" onClick={closeModal}>X</button>
            </span>
          </div>
          <div className="flex overflow-y-auto max-lg:h-auto h-full max-lg:p-4 p-10 justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
