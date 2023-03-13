import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyTasksWidget({ datasummary }) {
  return (
    <div className=" xbg-whitex">
      <div className="schedule my-3 xxtxt-darkblue3 font-bold">My Tasks</div>
      {datasummary.length < 1 ? (
        <div className="bg-whitex rounded mb-2 font-face-gm shadow-lg">
          <div className="p-2 border-b border-blue-900">
            <div className="font-bold capitalize">
              You have no assigned tasks <br /> Check tasks page to see tasks
              you are involved in
            </div>
          </div>
        </div>
      ) : (
        datasummary?.map((e) => {
          var status_cn;
          if (e.status === "Completed") {
            status_cn = "capitalize xpass rounded-lg text-xs p-1 px-2";
          } else {
            status_cn = "capitalize xwarn rounded-lg text-xs p-1 px-2";
          }
          return (
            <div
              key={e.id}
              className="bg-whitex rounded mb-2 font-face-gm shadow-lg"
            >
              <div className="p-2 border-b border-blue-900">
                <div className="font-bold capitalize">{e.name}</div>
                <div className="txt-greyed-out capitalize text-xs">
                  {e.scope}
                </div>
              </div>
              <div className="p-2 border-b border-blue-900 text-sm font-bold txt-greyed-out">
                <span>
                  <FontAwesomeIcon icon={["far", "user"]} /> Initiated By:{" "}
                  {e.initiatedBy}
                </span>
              </div>

              <div className=" p-2">
                <div className="text-sm font-bold txt-greyed-out relative w-full">
                  <span>
                    <FontAwesomeIcon icon={["far", "calendar"]} /> Due Date:{" "}
                    {e.deadline}
                  </span>
                  <span className="xpl-24 absolute right-0">
                    <span className={status_cn}>{e.status}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
