import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { fetchAllTeachersForFilters } from "../firebase/database";
import TeacherCard from "../components/TeacherCard/TeacherCard";

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  
  const [favoriteTeachers, setFavoriteTeachers] = useState([]); 
  const [visibleCount, setVisibleCount] = useState(4); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteTeachers([]);
        return;
      }

      setIsLoading(true);
      try {
        const allData = await fetchAllTeachersForFilters();
        const filtered = allData.filter((t) => favorites.includes(t.id));
        setFavoriteTeachers(filtered);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getFavorites();
  }, [favorites]);

  const visibleTeachers = favoriteTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < favoriteTeachers.length;

  return (
    <main className="bg-[#F8F8F8] min-h-screen pb-24 pt-10">
      <div className="header-container flex flex-col items-center gap-8">
        
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          !isLoading && (
            <div className="py-20 text-center">
              <p className="text-[20px] font-medium text-[#121417]">
                Your favorites list is empty.
              </p>
            </div>
          )
        )}

        {hasMore && !isLoading && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="mx-auto mt-16 px-12 py-4 bg-[var(--brand-color)] rounded-[12px] text-[18px] font-bold transition-all hover:bg-[var(--brand-color-light)] active:scale-95"
          >
            Load more
          </button>
        )}

        {isLoading && <p className="italic py-10 text-[#121417]">Loading...</p>}
      </div>
    </main>
  );
}