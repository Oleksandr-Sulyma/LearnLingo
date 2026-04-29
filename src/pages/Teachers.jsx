import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 
import { fetchTeachers, fetchAllTeachersForFilters } from "../firebase/database"; 
import { useFiltersStore } from "../store/useFiltersStore";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import TeacherSkeleton from "../components/TeacherCard/TeacherSkeleton";
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
        toast.error("Failed to load filter options.");
        console.error("Metadata error:", error);
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
      toast.error("Could not load teachers. Please try again later.");
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, [language, level, price]); 

  return (
    <main className="bg-[#F8F8F8] min-h-screen pb-24">
      <div className="header-container">
        <TeacherFilters teachers={allTeachersData} />
      </div>

      <div className="header-container flex flex-col items-center gap-8">
        {teachers.length > 0 && teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}

        {isLoading && (
          <>
            <TeacherSkeleton />
            <TeacherSkeleton />
            <TeacherSkeleton />
            <TeacherSkeleton />
          </>
        )}

        {!isLoading && teachers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg">No teachers found matching your criteria.</p>
          </div>
        )}

        {hasMore && !isLoading && teachers.length > 0 && (
          <button
            onClick={() => loadData(false)}
            className="mx-auto mt-16 px-12 py-4 bg-(--brand-color) rounded-xl text-[18px] font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
};