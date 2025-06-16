import Image from "next/image";
import React from "react";

interface NoDataHandlerProps {
  data: unknown[];
  alreadyFetched: boolean;
  children: React.ReactNode;
}

export default function NoDataHandler({
  data,
  alreadyFetched,
  children,
}: NoDataHandlerProps) {
  if (alreadyFetched && (!data || data.length === 0)) {
    return (
      <div className="top-[210px] absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <Image
          src="/no-data.png"
          alt="no data"
          width={144}
          height={144}
          className="mb-4"
        />
        <div className="font-medium text-xl text-black">查無相關資料</div>
        <div className="text-gray-500 text-sm mt-2">請調整關鍵字再重新搜尋</div>
      </div>
    );
  }

  return <>{children}</>;
}
