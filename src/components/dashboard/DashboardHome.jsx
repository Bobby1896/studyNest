import "../../styles/dashboardHome.scss";
import Img from "../../assets/dashHomePic.png";
import Icon from "../Icon";
import { downloadService, getService } from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import FirstLetters from "../FirstLetters";
import { Skeleton } from "primereact/skeleton";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router";
import { toast } from "react-toastify";

const DashboardHome = () => {
  const pageNum = 1;
  const pageSize = 5;
  const { user, isLoadingUser } = useAuth();

  const getCourses = async ({ queryKey }) => {
    const [_key, { pageNum, pageSize }] = queryKey;
    const response = await getService(
      `/courses?pageNumber=${pageNum}&pageSize=${pageSize}`
    );
    return response.data;
  };

  const { isPending, data } = useQuery({
    queryKey: ["getCourses", { pageNum, pageSize }],
    queryFn: getCourses,
  });

  const getCoursesRecomendation = async () => {
    const response = await getService(`/courses/recommendation`);
    return response.data;
  };

  const { isPending: recPending, data: recData } = useQuery({
    queryKey: ["getCoursesRecomendation"],
    queryFn: getCoursesRecomendation,
  });

  const handleDownload = async (id, filename) => {
    try {
      await downloadService.downloadFile(`/courses/download/${id}`, filename);
    } catch (error) {
      toast.error("Failed to download:", error);
    }
  };

  return (
    <div className="dashboard-home">
      <div className="home-banner">
        <header>
          <h2>
            Welcome,{" "}
            {isLoadingUser ? (
              <Skeleton width="5rem" className="mb-2"></Skeleton>
            ) : (
              user?.firstName
            )}
          </h2>
          <p>
            You’re making solid progress! 70% of your goal is done—just a little
            more to go. Keep going!"
          </p>
        </header>
        <div className="hide-on-mobile">
          <img src={Img} alt="" />
        </div>
      </div>

      <section className="courses-section">
        <div className="course-card">
          <div className="title">Overview of Courses</div>

          {isPending ? (
            <>
              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>
            </>
          ) : (
            data?.content?.map((list) => {
              return (
                <Link to="/course-module" key={list.id}>
                  <div className="course-list">
                    <div className="name">
                      {list?.name} ({list?.code})
                    </div>
                    <div className="date">Last accessed date - 03/03/2025</div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <div className="course-card">
          <div className="title">Recommended Courses</div>

          {recPending ? (
            <>
              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>

              <div className="space-for-skeleton">
                <Skeleton
                  height="2rem"
                  className="mb-2"
                  borderRadius="16px"
                ></Skeleton>
              </div>
            </>
          ) : (
            recData?.map((info) => {
              return (
                <div key={info.id} className="rec-course-card">
                  <div className="set-one">
                    <div className="course-initials">
                      <FirstLetters name={info?.name} />
                    </div>

                    <div className="course-name-and-file">
                      <div className="course-name">
                        {info?.name} ({info?.code}){" "}
                      </div>
                      <div className="file">
                        <Icon icon="pdf" />
                        <span>{info?.code} .pdf</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDownload(info?.id, `${info?.name}.pdf`)
                    }
                  >
                    <Icon icon="download" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
