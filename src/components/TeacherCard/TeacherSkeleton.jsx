export default function TeacherSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 flex gap-12 relative w-full border border-[rgba(18,20,23,0.05)] animate-pulse">
      <div className="relative w-30 h-30 p-3 border rounded-full shrink-0 flex items-center justify-center border-(--brand-color-light)">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="h-4 bg-gray-100 rounded w-20 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-48" />
          </div>
          <div className="flex items-start gap-3 mt-1">
            <div className="h-5 bg-gray-100 rounded w-28" /> {/* Lessons */}
            <div className="h-5 bg-gray-100 rounded w-24" /> {/* Done */}
            <div className="h-5 bg-gray-100 rounded w-20" /> {/* Rating */}
            <div className="h-5 bg-gray-100 rounded w-32" /> {/* Price */}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-8 mb-4">
          <div className="h-5 bg-gray-100 rounded w-[90%]" /> {/* Speaks */}
          <div className="h-5 bg-gray-100 rounded w-[95%]" /> {/* Info */}
          <div className="h-5 bg-gray-100 rounded w-[85%]" /> {/* Conditions */}
        </div>
        <div className="h-5 bg-gray-100 rounded w-24 mt-6 mb-8" />
        <div className="flex flex-wrap gap-2 mt-8">
          {[1, 2, 3, 4].map((_, index) => (
            <div 
              key={index} 
              className={`px-3 py-2 h-9.5 rounded-[15px] border ${index === 0 ? 'bg-gray-200 border-transparent' : 'border-[rgba(18,20,23,0.1)] bg-gray-50'}`}
              style={{ width: index === 0 ? '70px' : '60px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}