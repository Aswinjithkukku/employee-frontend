import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    totalEmployees: 0,
    search: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const { token } = useSelector((state) => state.users);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&search=${filters.search}`;
      const response = await axios.get(`/employees/listall?${searchQuery}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response?.data?.employees);

      setFilters((prev) => {
        return {
          ...prev,
          totalEmployees: response?.data?.totalEmployees || 0,
        };
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const prevSearchParams = (e) => {
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  useEffect(() => {
    let skip =
      Number(searchParams.get("skip")) > 0
        ? Number(searchParams.get("skip")) - 1
        : 0;
    let limit =
      Number(searchParams.get("limit")) > 0
        ? Number(searchParams.get("limit"))
        : 10;

    setFilters((prev) => {
      return { ...prev, skip, limit };
    });
    fetchData({ ...filters, skip, limit });
  }, [searchParams]);

  return (
    <div>
      <div className="max-w-screen-xl p-2 mx-auto sm:p-4 ">
        <div className="flex justify-between items-center pt-10">
          <h2 className="mb-4 text-xl pl-9 pb-5 font-bold leading-tight text-gray-500">
            Employee List
          </h2>
        </div>
        <div className="px-11">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData({ ...filters });
            }}
            className=""
          >
            <div className="w-full">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search attraction..."
                  className="w-full text-sm  h-10 rounded px-2 outline-none border focus:border-green-400 hover:border-blue-400"
                  name="attraction"
                  value={filters.search || ""}
                  onChange={(e) =>
                    setFilters((prev) => {
                      return { ...prev, search: e.target.value };
                    })
                  }
                />
                <button className="bg-blue-600 hover:bg-blue-700 w-[100px] text-white rounded font-[600] text-sm">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto px-11 flex my-5 justify-center items-center">
          <div className="relative overflow-x-auto w-full">
            {isLoading ? (
              <PageLoader />
            ) : (
              <div>
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Employee Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.map((item, index) => (
                      <tr key={item?.id} className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {filters.skip * filters.limit + 1 + index}
                        </th>
                        <td className="px-6 py-4">{item?.name}</td>
                        <td className="px-6 py-4">{item?.email}</td>
                        <td className="px-6 py-4">{item?.phone}</td>
                        <td className="px-6 py-4">{item?.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4">
                  <Pagination
                    limit={filters?.limit}
                    skip={filters?.skip}
                    total={filters?.totalEmployees}
                    incOrDecSkip={(number) => {
                      let params = prevSearchParams();
                      setSearchParams({
                        ...params,
                        skip: filters.skip + number + 1,
                      });
                    }}
                    updateSkip={(skip) => {
                      let params = prevSearchParams();
                      setSearchParams({
                        ...params,
                        skip: skip + 1,
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
