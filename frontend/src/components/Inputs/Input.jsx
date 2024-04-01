import PropTypes from "prop-types";
export default function Input({
  value,
  setValue,
  Icon,
  labelText,
  id,
  placeHolder,
  name,
}) {
  return (
    <div className="flex relative flex-col">
      {labelText && (
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <div className="flex">
        <span className="rounded-l-md inline-flex items-center px-3 border-t bg-slate-700 border-l border-b border-slate-400 text-gray-500 shadow-sm text-sm">
          {Icon}
        </span>
        <input
          type="text"
          name={name}
          id={id}
          className="rounded-r-lg flex-1 appearance-none border border-slate-400 w-full py-2 px-4 bg-slate-900 text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
          placeholder={placeHolder}
          value={value}
          onChange={setValue}
          required
        />
      </div>
    </div>
  );
}
Input.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func,
  Icon: PropTypes.object,
  labelText: PropTypes.string,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
  name: PropTypes.string,
};
