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
    backgroundColor: "rgba(8, 8, 12, 0.9)",
    border: state.isFocused ? "1px solid #A855F7" : "1px solid rgba(168, 85, 247, 0.35)",
    borderRadius: "0.75rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(168, 85, 247, 0.2)" : "0 10px 24px rgba(88, 28, 135, 0.4)",
    padding: "0.35rem 0.4rem",
    fontSize: "1rem",
    color: "#E2E8F0",
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
    color: "#E2E8F0",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94A3B8",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "rgba(168, 85, 247, 0.35)",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#C084FC",
    "&:hover": { color: "#7C3AED" },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#C084FC",
    "&:hover": {
      color: "#7C3AED",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#0b0b10",
    border: "1px solid rgba(168, 85, 247, 0.35)",
    borderRadius: "0.75rem",
    boxShadow: "0 24px 60px rgba(88, 28, 135, 0.6)",
    zIndex: 60,
    overflow: "hidden",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 60,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(168, 85, 247, 0.18)" : "transparent",
    color: state.isFocused ? "#E9D5FF" : "#E2E8F0",
    padding: "0.6rem 0.9rem",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    borderRadius: "999px",
    paddingLeft: "0.2rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#E9D5FF",
    fontWeight: 600,
    padding: "0.2rem 0.3rem",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#C084FC",
    borderRadius: "999px",
    ":hover": {
      backgroundColor: "rgba(168, 85, 247, 0.3)",
      color: "#E9D5FF",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#E2E8F0",
  }),
};
