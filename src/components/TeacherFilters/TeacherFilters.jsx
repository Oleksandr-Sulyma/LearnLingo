import { useMemo } from "react";
import { useFiltersStore } from "../../store/useFiltersStore";
import FilterSelect from "./FilterSelect";

export default function TeacherFilters({ teachers }) {
  const language = useFiltersStore((state) => state.language);
  const level = useFiltersStore((state) => state.level);
  const price = useFiltersStore((state) => state.price);
  const setFilter = useFiltersStore((state) => state.setFilter);

  const pricesOptions = useMemo(() => [
    { value: null, label: "All" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
  ], []);

  const languageOptions = useMemo(() => {
    if (!teachers || teachers.length === 0) return [{ value: null, label: "All" }];

    const languages = [...new Set(teachers.flatMap((t) => t.languages || []))]
      .filter(Boolean)
      .sort();

    return [
      { value: null, label: "All" },
      ...languages.map((lang) => ({ value: lang, label: lang })),
    ];
  }, [teachers]);

  const levelOptions = useMemo(() => {
    if (!teachers || teachers.length === 0) return [{ value: null, label: "All" }];

    const levels = [...new Set(teachers.flatMap((t) => t.levels || []))]
      .filter(Boolean)
      .sort();

    return [
      { value: null, label: "All" },
      ...levels.map((lvl) => ({ value: lvl, label: lvl })),
    ];
  }, [teachers]);

  return (
    <div className="py-8 flex gap-5 relative w-full font-['Roboto',sans-serif]">
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