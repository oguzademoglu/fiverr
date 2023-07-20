import React, {  useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  // const minRef = useRef();
  // const maxRef = useRef();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(9999)
  const { search }  = useLocation()
  const location = useLocation()
  console.log(location)

  const { data, isLoading, error, reFetch } = useFetch(`/gigs${search}&min=${min}&max=${max}&sort=${sort}`)

  // ${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    reFetch();
  },[sort])

  const apply = ()=>{
    reFetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr - Graphics & Design -</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input onChange = {e => setMin(e.target.value)}  type="number" placeholder="min" />
            {/* ref={minRef} */}
            <input onChange = {e => setMax(e.target.value)}  type="number" placeholder="max" />
            {/* ref={maxRef} */}
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? 'loading' : error ? 'something went wrong!' : data.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Gigs;
