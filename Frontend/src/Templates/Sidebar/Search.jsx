import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
// import debounce from "lodash/debounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  // const fetchUsers = async (term) => {
  //   if (!term?.trim()) {
  //     setResult([]);
  //     setLoading(false);
  //     return;
  //   }

  //   if (abortRef.current) abortRef.current.abort();
  //   const controller = new AbortController();
  //   abortRef.current = controller;

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `https://dummyjson.com/users/search?q=${encodeURIComponent(term)}`,
  //       { signal: controller.signal }
  //     );
  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //     const data = await res.json();

  //     setResult(Array.isArray(data?.users) ? data.users : []);
  //   } catch (e) {
  //     if (e.name !== "AbortError") {
  //       console.error(e);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Create a stable debounced function (runs once)
  // // const debouncedFetch = useMemo(
  // //   // () => debounce(fetchUsers, 400), 
  // //   []
  // // );

  // // Clean up debounce + abort on unmount
  // useEffect(() => {
  //   return () => {
  //     debouncedFetch.cancel();
  //     if (abortRef.current) abortRef.current.abort();
  //   };
  // }, [debouncedFetch]);

  const handleOnChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    debouncedFetch(val);
  };

  return (
    <div className="relative">
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        placeholder="Search users..."
        onChange={handleOnChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      {loading && (
        <div className="mt-2 text-sm text-gray-500">Searching…</div>
      )}

      {!loading && result.length > 0 && (
        <ul className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow">
          {result.map((user) => (
            <li
              key={user.id}
              className="px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="ml-auto text-xs text-gray-500">
                {user.username}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && result.length === 0 && (
        <div className="mt-2 text-sm text-gray-500">No results.</div>
      )}
    </div>
  );
}
