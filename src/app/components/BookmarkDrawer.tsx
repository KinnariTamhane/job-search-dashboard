import React from "react";
import Image from "next/image";
import { Job } from "../jobs-data";

interface BookmarkDrawerProps {
  open: boolean;
  onClose: () => void;
  bookmarks: Job[];
  toggleBookmark: (job: Job) => void;
}

const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({ open, onClose, bookmarks, toggleBookmark }) => (
  <div
    className={`fixed top-0 right-0 h-full w-80 bg-[var(--card)] shadow-2xl border-l border-[var(--muted)] z-30 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
    style={{ maxWidth: "100vw" }}
  >
    <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--muted)]">
      <h2 className="text-lg font-bold text-[var(--foreground)]">Bookmarked Jobs</h2>
      <button
        className="text-[var(--muted)] hover:text-[var(--accent)] text-2xl"
        onClick={onClose}
        aria-label="Close drawer"
      >
        ×
      </button>
    </div>
    <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
      {bookmarks.length === 0 ? (
        <p className="text-[var(--muted)]">No bookmarks yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {bookmarks.map((job) => (
            <li key={job.id} className="bg-[var(--background)] rounded p-3 flex flex-col gap-1 border border-[var(--muted)]">
              <div className="flex items-center gap-2">
                <Image src={job.logo} alt={job.company} width={24} height={24} className="rounded" />
                <span className="font-semibold text-[var(--foreground)]">{job.title}</span>
              </div>
              <span className="text-[var(--muted)] text-xs">{job.company}</span>
              <span className="text-[var(--muted)] text-xs">{job.location}</span>
              <button
                className="mt-2 text-xs text-red-400 hover:text-red-300 hover:underline self-end"
                onClick={() => toggleBookmark(job)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default BookmarkDrawer; 