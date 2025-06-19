import React from "react";
import Image from "next/image";
import { Job } from "../jobs-data";

interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  toggleBookmark: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, toggleBookmark }) => (
  <div
    className="bg-[var(--card)] rounded-lg shadow-lg p-6 flex flex-col gap-3 border border-[var(--muted)] hover:scale-[1.02] hover:shadow-xl transition-transform duration-200 relative group"
  >
    <div className="flex items-center gap-3 mb-2">
      <Image src={job.logo} alt={job.company} width={40} height={40} className="rounded" />
      <div>
        <h2 className="text-lg font-extrabold text-[#111827]">{job.title}</h2>
        <p className="text-[var(--muted)] text-sm">{job.company}</p>
      </div>
    </div>
    <p className="text-[var(--muted)] text-sm mb-2">{job.location}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {job.tags.map((t) => (
        <span key={t} className="bg-[var(--accent)] text-[var(--muted)] px-2 py-0.5 rounded text-xs font-semibold">{t}</span>
      ))}
    </div>
    <p className="text-[var(--foreground)] text-sm flex-1">{job.description}</p>
    <button
      className={`absolute top-4 right-4 transition-colors text-xl rounded-full w-9 h-9 flex items-center justify-center border shadow-md
        ${isBookmarked ? 'bg-white text-black border-gray-300' : 'bg-white text-yellow-400 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-yellow-500'}`}
      onClick={() => toggleBookmark(job)}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this job'}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this job'}
    >
      {isBookmarked ? "★" : "☆"}
    </button>
  </div>
);

export default JobCard; 