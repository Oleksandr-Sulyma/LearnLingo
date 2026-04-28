import { useEffect, useState } from "react";
import { useFiltersStore } from "../../store/useFiltersStore";
import FilterSelect from "./FilterSelect";

export default function TeacherFilters({ teachers }) {
  const language = useFiltersStore((state) => state.language);
  const level = useFiltersStore((state) => state.level);
  const price = useFiltersStore((state) => state.price);
  const setFilter = useFiltersStore((state) => state.setFilter);

  const [languageOptions, setLanguageOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  const pricesOptions = [
    { value: null, label: "All" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
  ];

  useEffect(() => {
    if (!teachers || teachers.length === 0) {
      setLanguageOptions([{ value: null, label: "All" }]);
      setLevelOptions([{ value: null, label: "All" }]);
      return;
    }

    const languages = [...new Set(teachers.flatMap((t) => t.languages || []))]
      .filter(Boolean)
      .sort();
    setLanguageOptions([
      { value: null, label: "All" },
      ...languages.map((lang) => ({ value: lang, label: lang })),
    ]);

    const levels = [...new Set(teachers.flatMap((t) => t.levels || []))]
      .filter(Boolean)
      .sort();
    setLevelOptions([
      { value: null, label: "All" },
      ...levels.map((level) => ({ value: level, label: level })),
    ]);
  }, [teachers]);

  return (
    <div className=" py-8 flex gap-5 relative w-full font-['Roboto',_sans-serif]">
      <FilterSelect
        options={languageOptions}
        label="Languages"
        width="221px"
        onChange={(option) => setFilter("language", option?.value || null)}
        value={language}
      />
      <FilterSelect
        options={levelOptions}
        label="Level of knowledge"
        width="198px"
        onChange={(option) => setFilter("level", option?.value || null)}
        value={level}
      />

      <FilterSelect
        options={pricesOptions}
        label="Price"
        width="144px"
        onChange={(option) => setFilter("price", option?.value || null)}
        value={price}
      />
    </div>
  );
}
