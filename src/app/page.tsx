"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "../components/modalComponents/modal";

interface listGallery {
  alt_description: string;
  urls: UrlThumbs;
  id: string;
}

interface UrlThumbs {
  thumb: string;
}

export default function Home() {
  const [listPhotos, setListPhotos] = useState<listGallery[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(30);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [id, setID] = useState<string>("");
  const [photos, setPhotos] = useState<any>({});

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

  const getOneData = async (id: string) => {
    await axios
      .get(`https://api.unsplash.com/photos/${id}`, {
        headers: {
          Authorization:
            "Client-ID Jil7W7aqxND8w1lWrZIiZ5-c8VZQ2us5a8-zl8XtjsI",
        },
      })
      .then((res) => {
        console.log(res);
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    console.log("first");
  }, [page, limitPage]);

  // useEffect(() => {
  //   getOneData(id);
  // }, [id]);

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

  const openModal = async (id: string) => {
    setModalStatus(!modalStatus);
    await getOneData(id);
  };

  const closeModal = () => {
    setModalStatus(!modalStatus);
    setID("");
    setPhotos({});
  };

  return (
    <>
      <Modal status={modalStatus} closeModal={closeModal} title={""}>
        <div className="flex max-lg:flex-col flex-row w-full space-x-2 h-full">
          <div className="flex justify-center w-full">
            <img
              alt={photos?.alt_description}
              className="w-auto"
              src={photos?.urls?.regular}
            />
          </div>
          <div className="flex flex-col justify-center space-y-1 w-full">
            <span className="w-full flex max-lg:justify-center justify-start max-lg:text-center">
              {photos?.alt_description}
            </span>
            <span className="flex justify-start max-lg:justify-center">
              {photos?.width} x {photos?.height}
            </span>
            <span className="flex space-x-1 items-baseline max-lg:justify-center justify-start">
              <i className="fa-solid fa-download"></i>
              <span>
                <a href={photos?.urls?.full} download="asas" target="_blank">
                  download
                </a>
              </span>
            </span>
          </div>
        </div>
      </Modal>
      <div className="flex w-full flex-col">
        <div className="flex w-full bg-white px-10 py-3 fixed">
          <div className="flex w-full justify-start">
            <Select
              defaultValue={{ value: limitPage, label: limitPage }}
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
        <div className="flex justify-center flex-row max-sm:py-16 py-10 space-x-1 space-y-1 flex-wrap flex-grow items-center">
          {listPhotos.map((a: listGallery) => {
            return (
              <>
                <img
                  alt={a.alt_description}
                  width="auto"
                  className="cursor-pointer"
                  src={a.urls.thumb}
                  onClick={() => {
                    openModal(a.id);
                    // setID(a.id);
                  }}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
