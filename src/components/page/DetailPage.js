import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import DetailTop from "../detail/DetailTop";
import Related from "../detail/Related";
import Description from "../detail/Description";
const DetailPage = () => {
  const params = useParams();

  const [product, setProduct] = useState([]);
  const [parId, setParId] = useState({});

  const priceInit = (price) => {
    let milion = Math.floor(price / 1000000);
    let thousand = Math.floor((price - milion * 1000000) / 1000);
    return `${milion}.${thousand}.000 VND`;
  };

  const productFetch = useCallback(async () => {
    try {
      const respone = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      const data = await respone.json();

      const loadProducts = [];

      data.map((res) => {
        if (res.name === params.id) {
          return setParId({
            ...res,
            price: priceInit(res.price),
            priceInit: res.price,
          });
        }
        return loadProducts.push({
          ...res,
          price: priceInit(res.price),
          priceInit: res.price,
        });
      });

      setProduct(loadProducts);
    } catch (error) {}
  }, [params]);

  useEffect(() => {
    productFetch();
  }, [productFetch]);

  return (
    <div>
      <DetailTop detail={parId} />
      <Description description={parId.long_desc} />
      <Related
        product={{
          products: product,
          category: parId.category,
          params: params.id,
        }}
      />
    </div>
  );
};

export default DetailPage;
