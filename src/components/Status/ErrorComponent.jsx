import { BsExclamationCircle } from "react-icons/bs";
export default function ErrorComponent() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex">
          <div className="p-1 flex justify-center items-center">
            <BsExclamationCircle size={24} />
          </div>
          <div>
            <p className="font-bold">Error:</p>
            <p className="text-sm">
              An error occurred while loading the content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
