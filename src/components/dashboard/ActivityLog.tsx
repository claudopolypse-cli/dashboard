"use client";

import type { ActivityEntry } from "./OpenPositions";

interface Props {
  activities: ActivityEntry[];
}

function timeAgo(ts: number): string {
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  return `${Math.floor(min / 60)}h ago`;
}

export default function ActivityLog({ activities }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-[#2a2018]">
        <span className="font-mono text-[0.6rem] text-[#6b5c50] tracking-[1.5px] uppercase">
          Recent Activity
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="font-mono text-[0.62rem] text-[#6b5c50]">No activity yet</span>
          </div>
        ) : (
          activities.map((a, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-2 px-3 py-2 border-b border-[#2a2018]/30 hover:bg-[#161210] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[0.62rem] text-[#a89888] truncate">{a.text}</div>
                <div className="font-mono text-[0.52rem] text-[#6b5c50] mt-0.5">{timeAgo(a.time)}</div>
              </div>
              <span className={`font-mono text-[0.6rem] font-semibold shrink-0 ${a.cls}`}>
                {a.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
