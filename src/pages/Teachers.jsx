import { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  const [hasMore, setHasMore] = useState(false);

  const [displayLimit, setDisplayLimit] = useState(4);

  const isFetchingRef = useRef(false);
  const { language, level, price } = useFiltersStore();

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const getFiltersData = async () => {
      try {
        const data = await fetchAllTeachersForFilters();
        setAllTeachersData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFiltersData();
  }, []);

  const applyClientFilters = useCallback((data) => {
    return data.filter((t) => !level || (t.levels && t.levels.includes(level)));
  }, [level]);

 const loadData = async (isInitial = false) => {
  if (isFetchingRef.current) return;
  isFetchingRef.current = true;
  setIsLoading(true);

  let accumulatedTeachers = isInitial ? [] : [...teachers];
  let currentCursor = isInitial ? null : lastVisible;
  let isMoreInDb = true;

  const currentFilteredCount = isInitial ? 0 : applyClientFilters(teachers).length;
  const targetTotal = currentFilteredCount + ITEMS_PER_PAGE;

  try {
    while (true) {
      const result = await fetchTeachers(currentCursor, { language, price });
      const newData = result?.data || [];
      const nextCursor = result?.lastVisible || null;

      if (newData.length === 0) {
        isMoreInDb = false;
        break;
      }

      accumulatedTeachers = [...accumulatedTeachers, ...newData];
      currentCursor = nextCursor;
      
      const filteredResults = applyClientFilters(accumulatedTeachers);

      if (newData.length < 4) {
        isMoreInDb = false;
        break;
      }

      if (filteredResults.length >= targetTotal) {
        const checkNext = await fetchTeachers(currentCursor, { language, price });
        isMoreInDb = checkNext.data.length > 0;
        break;
      }
    }

    setTeachers(accumulatedTeachers);
    setLastVisible(currentCursor);
    setHasMore(isMoreInDb);
    setDisplayLimit(targetTotal);

  } catch (error) {
    toast.error("Could not load teachers.");
    console.error(error);
  } finally {
    setIsLoading(false);
    isFetchingRef.current = false;
  }
};

  useEffect(() => {
    setTeachers([]);
    setLastVisible(null);
    setHasMore(false);
    setDisplayLimit(4);
    
    const timeoutId = setTimeout(() => loadData(true), 10);
    return () => clearTimeout(timeoutId);
  }, [language, price, level]);

  const filteredTeachers = useMemo(() => {
    const allFiltered = applyClientFilters(teachers);
    return allFiltered.slice(0, displayLimit); 
  }, [teachers, applyClientFilters, displayLimit]);

  const canShowMore = useMemo(() => {
    if (!hasMore) return false;
    return true; 
  }, [hasMore]);

  return (
    <main className="bg-[#F8F8F8] min-h-screen pb-24">
      <div className="header-container">
        <TeacherFilters teachers={allTeachersData} />
      </div>

      <div className="header-container flex flex-col items-center gap-8">
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}

        {isLoading && (
          <div className="w-full flex flex-col items-center gap-8">
            <TeacherSkeleton />
            <TeacherSkeleton />
          </div>
        )}

        {!isLoading && filteredTeachers.length === 0 && (
          <p className="py-20 text-gray-500">No teachers found matching your criteria.</p>
        )}

        {hasMore && !isLoading && filteredTeachers.length > 0 && (
          <button
            onClick={() => loadData(false)}
            className="mx-auto mt-16 px-12 py-4 bg-(--brand-color) rounded-xl text-[18px] font-bold transition-all hover:opacity-90 active:scale-95"
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
}