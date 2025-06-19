import React from "react";
import { Job } from "../jobs-data";
import JobCard from "./JobCard";

interface JobGridProps {
  jobs: Job[];
  bookmarks: Job[];
  toggleBookmark: (job: Job) => void;
  onResetFilters?: () => void;
}

const JobGrid: React.FC<JobGridProps> = ({ jobs, bookmarks, toggleBookmark, onResetFilters }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-40 text-xl text-gray-500 font-semibold gap-4">
        <div>No Result Found</div>
        {onResetFilters && (
          <button
            className="mt-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white text-base font-bold transition-colors"
            onClick={onResetFilters}
          >
            Back to Home
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isBookmarked={!!bookmarks.find((j) => j.id === job.id)}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

export default JobGrid; 