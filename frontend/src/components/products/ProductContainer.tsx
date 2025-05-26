"use client";

import { AppDispatch, RootState } from "@/redux/globalStore";
import { getProduct } from "@/redux/productSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductContainer() {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  // redux state
  const { products } = useSelector((state: RootState) => state.products);
  // component state
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    type: "",
  });
  // call api
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await dispatch(
          getProduct({
            page: page,
            state: filters.state,
            type: filters.type,
            search: filters.search,
          })
        );
        if (getProduct.fulfilled.match(response)) {
          console.log("Lấy thành công sản phẩm");
        }
      } catch (error) {
        if (getProduct.rejected.match(error)) {
          console.log("error:", error);
        }
      }
    };
    fetchProduct();
  }, [dispatch, filters, page]);
  return (
    <div className="py-6 w-full h-auto">
      {products ? (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 place-items-center">
          {products.map((product) => (
            <Link href={"/"} key={product._id} className="flex flex-col">
              {/* Ảnh sản phẩm */}
              <Image
                src={product.img}
                width={100}
                height={100}
                alt={product.name}
                className=""
              />
              <div>
                <p>{product.name}</p>
              </div>
              <div>
                <p className="text-red-500">{product.price}$</p>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <></>
      )}

      <div>
        <button disabled={page == 1} onClick={() => setPage(page - 1)}>
          prev
        </button>
        <button onClick={() => setPage(page + 1)}>next</button>
      </div>
    </div>
  );
}
