"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

interface listGallery {
  alt_description: string;
  urls: UrlThumbs;
}

interface UrlThumbs {
  thumb: string;
}

export default function Home() {
  const [listPhotos, setListPhotos] = useState<listGallery[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(20);

  const getData = async () => {
    await axios
      .get(
        `https://api.unsplash.com/photos?page=${page}&per_page=${limitPage}`,
        {
          headers: {
            Authorization:
              "Client-ID Jil7W7aqxND8w1lWrZIiZ5-c8VZQ2us5a8-zl8XtjsI",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setListPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    console.log("first");
  }, [page, limitPage]);

  const changePagination = (pagination: string) => {
    if (pagination == "previous") {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };

  const selectOption = [
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 30,
      label: 30,
    },
  ];

  const changeLimitPerPage = (val: number) => {
    setLimitPage(val);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full bg-white px-10 py-3 fixed">
        <div className="flex w-full justify-start">
          <Select
            defaultValue={{ val: limitPage, label: limitPage }}
            options={selectOption}
            onChange={(val: any) => changeLimitPerPage(val?.value)}
          ></Select>
        </div>
        <div className="flex space-x-2 flex-row justify-end w-full max-h-screen">
          <button
            className={page == 1 ? "pointer-events-none text-gray-400" : ""}
            onClick={() => changePagination("previous")}
          >
            previous
          </button>
          <span className="flex items-center">{page}</span>
          <button onClick={() => changePagination("next")}>next</button>
        </div>
      </div>
      <div className="flex justify-center flex-row max-sm:py-16 py-10 space-x-1 space-y-1  flex-wrap flex-grow items-center">
        {listPhotos.map((a: any) => {
          return (
            <>
              <img alt={a.alt_description} width="auto" src={a.urls.thumb} />
            </>
          );
        })}
      </div>
    </div>
  );
}
