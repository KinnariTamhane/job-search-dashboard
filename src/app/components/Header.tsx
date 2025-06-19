import React from "react";
import Link from "next/link";

interface HeaderProps {
  search: string;
  location: string;
  tag: string;
  setSearch: (v: string) => void;
  setLocation: (v: string) => void;
  setTag: (v: string) => void;
  onOpenDrawer: () => void;
  bookmarksCount: number;
  onResetFilters?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  search,
  location,
  tag,
  setSearch,
  setLocation,
  setTag,
  onOpenDrawer,
  bookmarksCount,
  onResetFilters,
}) => (
  <header className="w-full px-4 py-6 flex flex-col md:flex-row items-center justify-between bg-[var(--card)] shadow-lg sticky top-0 z-20">
    <Link
      href="/"
      prefetch={false}
      className="text-2xl font-bold tracking-tight mb-4 md:mb-0 text-black"
      onClick={(e) => {
        if (onResetFilters) {
          e.preventDefault();
          onResetFilters();
        }
      }}
    >
      HireBoard
    </Link>
    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search jobs..."
        className="px-3 py-2 rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full md:w-56 border border-[var(--muted)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="px-3 py-2 rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full md:w-40 border border-[var(--muted)]"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="Tag (e.g. React)"
        className="px-3 py-2 rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-full md:w-40 border border-[var(--muted)]"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      /> */}
    </div>
    <button
      className="ml-0 md:ml-4 mt-4 md:mt-0 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors font-bold flex items-center gap-2 text-white"
      onClick={onOpenDrawer}
    >
      <span>Bookmarks</span>
      <span className="bg-[#e0e7ef] px-2 py-0.5 rounded text-xs text-black font-bold">{bookmarksCount}</span>
    </button>
  </header>
);

export default Header; 