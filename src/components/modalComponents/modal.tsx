const Modal = ({ status, children, closeModal, title }) => {
  console.log(status);
  return (
    <>
      <div
        className={
          status
            ? "flex fixed z-50 max-sm:px-2 px-40 pt-20 pb-28 w-full h-full left-0 top-0 bg-black bg-opacity-35"
            : "hidden"
        }
      >
        <div className="flex w-full max-lg:h-auto flex-col px-2 rounded-md bg-white h-full">
          <div className="flex w-full">
            <span className="w-full flex justify-start">{title}</span>
            <span className="flex w-full justify-end px-1">
              <button onClick={closeModal}>X</button>
            </span>
          </div>
          <div className="flex overflow-y-auto max-sm:h-fit h-full p-10 justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
