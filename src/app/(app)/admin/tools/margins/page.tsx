"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Margins = () => {
  const { data: session } = useSession();

  const [sport, setSport] = useState("Football");
  const [margin, setMargin] = useState("PRE");

  const onHandleSearch = async () => {};

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="grid md:flex gap-1 justify-center items-center">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Table Tennis">Table Tennis</option>
              <option value="Handball">Handball</option>
              <option value="Futsal">Futsal</option>
              <option value="Ice Hockey">Ice Hockey</option>
            </select>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setMargin(e.target.value)}
              >
                <option value="PRE">PRE</option>
                <option value="Live">Live</option>
              </select>
            <button
              className="mx-auto w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
              onClick={onHandleSearch}
            >
              Search
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Margins;
