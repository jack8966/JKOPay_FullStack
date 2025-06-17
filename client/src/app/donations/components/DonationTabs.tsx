"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import CharitiesList from "./CharitiesList";
import ProjectsList from "./ProjectsList";
import ProductsList from "./ProductsList";
import { Charity } from "./CharitiesList";
import { ListApiResponse } from "@/app/api/donations/route";
import LoadingImage from "@/public/loading.svg";

const tabs = [
  { key: "charities", label: "公益團體" },
  { key: "projects", label: "捐款專案" },
  { key: "products", label: "義賣商品" },
];

export default function DonationTabs() {
  const [activeTab, setActiveTab] = useState<
    "charities" | "projects" | "products"
  >("charities");
  const [isSearchBlockVisible, setIsSearchBlockVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState<ListApiResponse<Charity>>({
    hasMore: false,
    total: 0,
    data: [],
  });
  const [page, setPage] = useState(1);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  const fetchDataAndInitState = useCallback(
    async (searchText?: string) => {
      try {
        setIsLoading(true);

        if (activeTab !== "charities") return;

        const res = await fetch(
          `/api/donations?type=${activeTab}&page=1&limit=10${
            searchText ? `&name=${searchText}` : ""
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (activeTab === "charities") {
          setListData(data as ListApiResponse<Charity>);
        } else if (activeTab === "projects") {
          // TODO: support projects search
        } else if (activeTab === "products") {
          // TODO: support products search
        }

        return data;
      } catch (error) {
        console.error(error);
        // TODO: show error toast
      } finally {
        setIsLoading(false);
        setAlreadyFetched(true);
      }
    },
    [activeTab]
  );

  const fetchMoreData = useCallback(async () => {
    console.log(page + 1);
    setPage(page + 1);

    const res = await fetch(
      `/api/donations?type=${activeTab}&page=${page + 1}&limit=10${
        searchText ? `&name=${searchText}` : ""
      }`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    if (activeTab === "charities") {
      setListData((prev) => ({
        ...data,
        data: [...prev.data, ...data.data],
      }));
    } else if (activeTab === "projects") {
      // TODO: support projects search
    } else if (activeTab === "products") {
      // TODO: support products search
    }
  }, [page, activeTab, searchText]);

  useEffect(() => {
    if (!isSearchBlockVisible) {
      fetchDataAndInitState();
    }
  }, [isSearchBlockVisible, fetchDataAndInitState]);

  const clearPageState = useCallback(() => {
    setPage(1);
    setAlreadyFetched(false);
    setListData({
      hasMore: false,
      total: 0,
      data: [],
    });
  }, []);

  const onTabChange = useCallback(
    (tab: "charities" | "projects" | "products") => {
      clearPageState();
      setActiveTab(tab);
    },
    [setActiveTab, clearPageState]
  );

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const onSearchKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        clearPageState();
        fetchDataAndInitState(searchText);
      }
    },
    [searchText, fetchDataAndInitState, clearPageState]
  );

  const handleCancelSearch = useCallback(() => {
    clearPageState();
    setSearchText("");
    setIsSearchBlockVisible(false);
  }, [clearPageState]);

  return (
    <div className="h-full max-w-screen-sm mx-auto bg-background min-h-screen shadow-md flex flex-col">
      <div className="bg-primary text-white text-lg p-0 h-12 flex items-center justify-center font-bold">
        所有捐款項目
      </div>
      {isSearchBlockVisible && (
        <div className="w-full h-[70px] p-[15px] bg-white">
          <div className="w-full h-full flex relative items-center justify-between">
            <input
              autoFocus={isSearchBlockVisible}
              className="flex-1 rounded-3xl px-2 py-1 bg-black/5 h-10 indent-9 caret-[#42A1FE] text-[14px] leading-1 focus:outline-none"
              type="text"
              value={searchText}
              onChange={onSearchChange}
              onKeyDown={onSearchKeyDown}
            />
            <CiSearch
              size={24}
              color="oklch(55.1% .027 264.364)"
              style={{
                strokeWidth: "0.5",
                position: "absolute",
                left: "12px",
              }}
            />
            <button
              className="h-10 pl-3 text-[#2E7DD9]"
              onClick={handleCancelSearch}
            >
              取消
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center bg-white h-11 text-[16px] leading-11">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              onTabChange(tab.key as "charities" | "projects" | "products")
            }
            className={`flex-1 cursor-pointer transition-colors duration-150`}
            type="button"
          >
            <div className="text-base inline-block leading-[38px]">
              <span
                className={`${
                  activeTab === tab.key
                    ? "text-primary font-medium"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
              {activeTab === tab.key && (
                <div className="h-1 w-full bg-primary bottom-0 rounded-t-md" />
              )}
            </div>
          </button>
        ))}
      </div>
      {!isSearchBlockVisible && (
        <div className="flex items-end justify-between h-12 text-[16px] leading-11 px-4">
          <select className="bg-background-secondary rounded-md border-none px-2 py-1">
            <option>全部</option>
          </select>
          <div className="bg-background-secondary h-[34px] w-[34px] flex items-center justify-center rounded-full">
            <CiSearch
              size={20}
              color="oklch(55.1% .027 264.364)"
              style={{ strokeWidth: "1.1" }}
              onClick={() => setIsSearchBlockVisible(true)}
            />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={LoadingImage}
            alt="loading"
            width={22}
            height={22}
            className="animate-spin"
          />
        </div>
      )}
      <div
        className="flex-1 px-4 py-4 scroll-y overflow-auto"
        id="scrollableDiv"
      >
        {activeTab === "charities" && (
          <CharitiesList
            listData={listData}
            alreadyFetched={alreadyFetched}
            fetchMoreCallback={fetchMoreData}
          />
        )}
        {activeTab === "projects" && <ProjectsList />}
        {activeTab === "products" && <ProductsList />}
      </div>
    </div>
  );
}
