import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import DetailTop from "../detail/DetailTop";
import Related from "../detail/Related";
import Description from "../detail/Description";
import axios from "axios";
const DetailPage = () => {
  const params = useParams();

  const [parId, setParId] = useState({});

  const priceInit = (price) => {
    let milion = Math.floor(price / 1000000);
    let thousand = Math.floor((price - milion * 1000000) / 1000);
    return `${milion}.${thousand}.000 VND`;
  };

  useEffect(() => {
    axios
      .get(`/product/products/${params.id}`)
      .then((res) => {
        return res.data[0];
      })
      .then((product) => {
        const loadProduct = { ...product, price: priceInit(product.price) };
        setParId(loadProduct);
      });
  }, [params]);

  return (
    <div>
      <DetailTop detail={parId} />
      <Description description={parId.long_desc} />
      <Related
        product={{
          category: parId.category,
          params: params.id,
        }}
      />
    </div>
  );
};

export default DetailPage;
