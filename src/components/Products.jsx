import "./Products.css";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
const Products = () => {
  const [product, setProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("y");
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFilterList(data);
      });
  }, []);

  useEffect(() => {
    // console.log("filterList",filterList);
    let filter = filterList?.filter((element) => {
      if (element.description.includes(searchKeyword)) {
        return true;
      }
      if (element.title.includes(searchKeyword)) {
        return true;
      }
      if (element.category.includes(searchKeyword)) {
        return true;
      }
      return false;
    });
    setProduct(filter);

    return () => {
      console.log("component will mount");
    };
  }, [searchKeyword]);

  // console.log("searchKeyword", searchKeyword);
  // console.log("product", product);
  // console.log("filterList", filterList);
  return (
    <div>
      <input
        type="text"
        placeholder="Search by title,description,catgory..."
        onKeyUp={(e) => setSearchKeyword(e.target.value.toLowerCase())}
      />
      <div className="product-container">
        {product.length !== 0 ? (
          product.map((element, i) => {
            return <SingleCard key={element.id} {...element} />;
          })
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
