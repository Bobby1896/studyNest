import { useState, useEffect } from "react";
import "../../styles/courseModule.scss";
import Icon from "../Icon";
import Pagination from "../TablePagination";
import { downloadService, getService } from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "primereact/skeleton";
import { toast } from "react-toastify";

// Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CourseModule = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce the search text with 500ms delay
  const debouncedSearchText = useDebounce(searchText, 500);

  const getCourses = async ({ queryKey }) => {
    const [_key, { currentPage, pageSize, debouncedSearchText }] = queryKey;
    let url = `/courses?pageNumber=${currentPage}&pageSize=${pageSize}`;

    // Add search param if search text exists
    if (debouncedSearchText) {
      url += `&name=${encodeURIComponent(debouncedSearchText)}`;
    }

    const response = await getService(url);
    return response.data;
  };

  const { isPending, data } = useQuery({
    queryKey: ["getCourses", { currentPage, pageSize, debouncedSearchText }],
    queryFn: getCourses,
  });

  const handleDownload = async (id, filename) => {
    try {
      await downloadService.downloadFile(`/courses/download/${id}`, filename);
    } catch (error) {
      toast.error("Failed to download:", error);
    }
  };

  return (
    <div className="course-module">
      <div className="title">Course & Management Module</div>

      <div>
        <input
          placeholder="Search"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="table">
        <div className="table-head table-content">
          <div>Name of Course (.pdf)</div>
          <div>Course Code</div>
          <div>Action</div>
        </div>

        {isPending ? (
          <>
            <div className="space-for-skeleton">
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>

            <div className="space-for-skeleton">
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>

            <div className="space-for-skeleton">
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>

            <div className="space-for-skeleton">
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>

            <div className="space-for-skeleton">
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>
          </>
        ) : data?.content?.length === 0 ? (
          <div className="no-results">
            <Icon icon="search-off" /> {/* Optional: Add an icon */}
            <p
              style={{
                margin: "0 20px",
                textAlign: "Center",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              No course found
            </p>
          </div>
        ) : (
          data?.content?.map((list) => (
            <div key={list.id} className="table-content table-body">
              <div className="icon-and-name">
                <Icon icon="pdf" /> {list?.name}{" "}
              </div>
              <div>{list?.code}</div>
              <div>
                <button
                  onClick={() => handleDownload(list?.id, `${list?.name}.pdf`)}
                >
                  <Icon icon="download" />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Only show pagination if there are results */}
        {!isPending && data?.content?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={data?.totalElements}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseModule;
