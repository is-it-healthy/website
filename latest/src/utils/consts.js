/*
URLs to fetch data from
*/
export const urlInsSummary = "https://raw.githubusercontent.com/is-it-healthy/data/refs/heads/v2/dist/ins-summary.json"
export const urlInsEachStart = `https://raw.githubusercontent.com/is-it-healthy/data/v2/dist/single/`


/*
Fields for each fetched inidivual ins item
*/
export const insDataSections = [
  { key: "side_effects", title: "Side Effects" },
  { key: "overview", title: "Overview" },
  { key: "uses", title: "Uses" },
  { key: "precautions", title: "Precautions" },
  { key: "interactions", title: "Interactions" },
  { key: "origin", title: "Origin" },
  { key: "daily_intake", title: "Daily Intake" },
];


/*
For styles dropdown menus (<Select>)
  https://github.com/jedwatson/react-select
  https://react-select.com/home
*/
export const reactSelectCustomOptions = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    border: state.isFocused ? "2px solid #3B82F6" : "1px solid #D1D5DB",
    borderRadius: "0.375rem", // DaisyUI's rounded-md
    boxShadow: state.isFocused ? "0 0 0 2px #93C5FD" : "none",
    padding: "0.25rem",
    fontSize: "1rem",
    color: "#374151", // text-gray-700
    "&:hover": {
      borderColor: "#3B82F6", // hover:border-blue-500
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF", // text-gray-400
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#9CA3AF",
    "&:hover": {
      color: "#3B82F6", // hover:border-blue-500
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid #D1D5DB", // border-gray-300
    borderRadius: "0.375rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // subtle shadow
    zIndex: 10,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#EFF6FF" : "white", // focus:bg-blue-100
    color: state.isFocused ? "#1E3A8A" : "#374151", // text-blue-900 or text-gray-700
    padding: "0.5rem 1rem",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151", // text-gray-700
  }),
};
