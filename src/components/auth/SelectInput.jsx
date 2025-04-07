import Icon from "../Icon";

const SelectInput = ({ icon, data, placeholder, name, value, onChange, errors }) => {
  return (
    <div className="input-wrapper">
      <select name={name} value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {data && data.length > 0 ? (
          data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No data to display
          </option>
        )}
      </select>
      <Icon icon={icon} />
      {errors && <span className="error">{errors}</span>}

    </div>
  );
};

export default SelectInput;
