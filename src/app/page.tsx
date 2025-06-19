"use client";
import { useState, useMemo } from "react";
import { jobs as allJobs, Job } from "./jobs-data";
import Image from "next/image";

const JOBS_PER_PAGE = 10;

export default function Home() {
  // Search and pagination state
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  // Bookmark drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Bookmarks (to be integrated with localStorage)
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    // Parse tag input into an array of trimmed, lowercased tags
    const tagList = tag
      .split(/[, ]+/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);
    return allJobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());
      // Multi-tag search: all entered tags must be present in job.tags
      const matchesTag =
        tagList.length === 0 ||
        tagList.every((inputTag) =>
          job.tags.some((jobTag) => jobTag.toLowerCase() === inputTag)
        );
      return matchesSearch && matchesLocation && matchesTag;
    });
  }, [search, location, tag]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const jobsToShow = filteredJobs.slice(
    (page - 1) * JOBS_PER_PAGE,
    page * JOBS_PER_PAGE
  );

  // Bookmark logic (skeleton)
  const toggleBookmark = (job: Job) => {
    setBookmarks((prev) => {
      if (prev.find((j) => j.id === job.id)) {
        return prev.filter((j) => j.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-6 flex flex-col md:flex-row items-center justify-between bg-gray-900 shadow-lg sticky top-0 z-20">
        <h1 className="text-2xl font-bold tracking-tight mb-4 md:mb-0">HireBoard</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search jobs..."
            className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-56"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-40"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Tag (e.g. React)"
            className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-40"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          /> */}
        </div>
        <button
          className="ml-0 md:ml-4 mt-4 md:mt-0 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
          onClick={() => setDrawerOpen(true)}
        >
          <span>Bookmarks</span>
          <span className="bg-gray-800 px-2 py-0.5 rounded text-xs">{bookmarks.length}</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {/* Job grid or No Result message */}
        {jobsToShow.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-xl text-gray-500 font-semibold">
            No Result Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToShow.map((job) => (
              <div
                key={job.id}
                className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col gap-3 border border-gray-800 hover:scale-[1.02] hover:shadow-xl transition-transform duration-200 relative group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image src={job.logo} alt={job.company} width={40} height={40} className="rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{job.location}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.tags.map((t) => (
                    <span key={t} className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm flex-1">{job.description}</p>
                <button
                  className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors text-xl"
                  onClick={() => toggleBookmark(job)}
                  aria-label="Bookmark job"
                >
                  {bookmarks.find((j) => j.id === job.id) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {jobsToShow.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Bookmark Drawer (skeleton) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl border-l border-gray-800 z-30 transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ maxWidth: "100vw" }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <h2 className="text-lg font-bold">Bookmarked Jobs</h2>
          <button
            className="text-gray-400 hover:text-white text-2xl"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {bookmarks.length === 0 ? (
            <p className="text-gray-500">No bookmarks yet.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {bookmarks.map((job) => (
                <li key={job.id} className="bg-gray-800 rounded p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Image src={job.logo} alt={job.company} width={24} height={24} className="rounded" />
                    <span className="font-semibold">{job.title}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{job.company}</span>
                  <span className="text-gray-500 text-xs">{job.location}</span>
                  <button
                    className="mt-2 text-xs text-red-400 hover:underline self-end"
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
    </div>
  );
}
