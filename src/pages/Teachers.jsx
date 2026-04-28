import { useEffect, useState } from "react";
import { fetchTeachers, fetchAllTeachersForFilters } from "../firebase/database"; 
import { useFiltersStore } from "../store/useFiltersStore";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import TeacherFilters from "../components/TeacherFilters/TeacherFilters";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]); 
  const [allTeachersData, setAllTeachersData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { language, level, price } = useFiltersStore();

  useEffect(() => {
    const getFiltersData = async () => {
      try {
        const data = await fetchAllTeachersForFilters();
        setAllTeachersData(data);
      } catch (error) {
        console.error("Помилка завантаження метаданих:", error);
      }
    };
    getFiltersData();
  }, []);

  const loadData = async (isInitial = false) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const currentCursor = isInitial ? null : lastVisible;
      const result = await fetchTeachers(currentCursor, { language, level, price }); 
      const newData = result?.data || [];
      const nextCursor = result?.lastVisible || null;

      if (isInitial) {
        setTeachers(newData);
      } else {
        setTeachers((prev) => [...prev, ...newData]);
      }

      setLastVisible(nextCursor);
      setHasMore(newData.length === 4); 
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, [language, level, price]); 

  const filteredTeachers = teachers.filter((t) => {
  const matchLvl = !level || t.levels.includes(level);
  return matchLvl;
});

  return (
    <main className="bg-[#F8F8F8] min-h-screen pb-24">
      <div className="header-container">
        <TeacherFilters teachers={allTeachersData} />
      </div>

      <div className="header-container flex flex-col items-center gap-8">
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          !isLoading && <p className="py-20 text-gray-500">No teachers found matching your criteria.</p>
        )}

        {hasMore && !isLoading && (
          <button
            onClick={() => loadData(false)}
            className="mx-auto mt-16 px-12 py-4 bg-[var(--brand-color)] rounded-[12px] text-[18px] font-bold transition-all hover:bg-[var(--brand-color-light)] active:scale-95 disabled:opacity-50"
          >
            Load more
          </button>
        )}
        
        {isLoading && <p className="italic py-10">Loading...</p>}
      </div>
    </main>
  );
};