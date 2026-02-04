/*
URLs to fetch data from
*/
export const urlInsSummary = "https://raw.githubusercontent.com/is-it-healthy/data/refs/heads/main/dist/ins-summary.json"
export const urlInsEachStart = `https://raw.githubusercontent.com/is-it-healthy/data/main/dist/single/`


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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: state.isFocused ? "1px solid #A855F7" : "1px solid #E9D5FF",
    borderRadius: "0.75rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(168, 85, 247, 0.15)" : "0 8px 20px rgba(168, 85, 247, 0.08)",
    padding: "0.35rem 0.4rem",
    fontSize: "1rem",
    color: "#374151", // text-gray-700
    minHeight: "52px",
    "&:hover": {
      borderColor: "#C084FC",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 0.5rem",
    gap: "0.35rem",
  }),
  input: (base) => ({
    ...base,
    color: "#0F172A",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94A3B8",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "#E9D5FF",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#A855F7",
    "&:hover": { color: "#7C3AED" },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#A855F7",
    "&:hover": {
      color: "#7C3AED",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid #E9D5FF",
    borderRadius: "0.75rem",
    boxShadow: "0 18px 40px rgba(168, 85, 247, 0.18)",
    zIndex: 60,
    overflow: "hidden",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 60,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#FAF5FF" : "white",
    color: state.isFocused ? "#6B21A8" : "#374151",
    padding: "0.6rem 0.9rem",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#F3E8FF",
    borderRadius: "999px",
    paddingLeft: "0.2rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#6B21A8",
    fontWeight: 600,
    padding: "0.2rem 0.3rem",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#A855F7",
    borderRadius: "999px",
    ":hover": {
      backgroundColor: "#E9D5FF",
      color: "#7C3AED",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151", // text-gray-700
  }),
};
