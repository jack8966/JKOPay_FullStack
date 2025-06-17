"use client";

import { ListApiResponse } from "@/app/api/donations/route";
import NoDataHandler from "@/components/noDataHandler";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

export interface Charity {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface CharitiesListProps {
  listData: ListApiResponse<Charity>;
  alreadyFetched: boolean;
  fetchMoreCallback: () => Promise<void>;
}

export default function CharitiesList({
  listData,
  alreadyFetched,
  fetchMoreCallback,
}: CharitiesListProps) {
  const charities = listData.data;

  return (
    <NoDataHandler data={charities} alreadyFetched={alreadyFetched}>
      <div className="flex flex-col gap-4">
        <InfiniteScroll
          dataLength={listData.data.length}
          next={fetchMoreCallback}
          hasMore={listData.hasMore}
          loader={<div>Loading...</div>}
          endMessage={
            <div className="relative">
              <div className="text-center text-black/20 text-[13px]/5 flex flex-col justify-center items-center before:absolute before:top-1/2 before:left-0 before:border-t-[1px] before:border-t-[black/20] before:w-full">
                <div className="z-10 px-3 bg-background">愛心沒有底線</div>
              </div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {charities.map((charity) => (
            <div
              className="flex flex-row items-center mb-3 p-3 text-[16px] rounded-xl bg-white hover:bg-gray-50 cursor-pointer"
              key={charity.id}
            >
              <div className="w-[64px] h-[64px] border border-gray-200 rounded-md mr-3">
                <Image
                  src={charity.imageUrl}
                  alt={charity.name}
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex-1 h-full flex flex-col justify-center">
                <div className="font-medium text-[16px]/6">{charity.name}</div>
                <div className="text-gray-500 text-[13px]/5 line-clamp-2">
                  {charity.description}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </NoDataHandler>
  );
}
