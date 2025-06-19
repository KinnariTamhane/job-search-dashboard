"use client";
import { useState, useMemo } from "react";
import { jobs as allJobs, Job } from "./jobs-data";
import Header from "./components/Header";
import JobGrid from "./components/JobGrid";
import Pagination from "./components/Pagination";
import BookmarkDrawer from "./components/BookmarkDrawer";

const JOBS_PER_PAGE = 10;

export default function Home() {
  // Search and pagination state
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  // Bookmark drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Bookmarks (to be integrated with localStorage)
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());
      return matchesSearch && matchesLocation;
    });
  }, [search, location]);

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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col">
      <Header
        search={search}
        location={location}
        setSearch={setSearch}
        setLocation={setLocation}
        onOpenDrawer={() => setDrawerOpen(true)}
        bookmarksCount={bookmarks.length}
        onResetFilters={() => {
          setSearch("");
          setLocation("");
          setPage(1);
        }}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <JobGrid
          jobs={jobsToShow}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          onResetFilters={() => {
            setSearch("");
            setLocation("");
            setPage(1);
          }}
        />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </main>
      <BookmarkDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
    </div>
  );
}
