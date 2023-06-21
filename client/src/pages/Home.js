import React, { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { get } from "../services/authService";


function Home() {
  const { allProducts, setAllProducts } = useContext(LoadingContext);

  useEffect(() => {
    get("/users").then((response) => {
      console.log("response LINE @&!!!", response.data);

      setAllProducts(response.data);
    });
  }, []);

  return (
    <div className=" text-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <img
            // src={require("../logoColor.png")}
            alt="Logo"
            className=" h-32 mr-6"
          />
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-2xl mt-8">
            Browse our Free and Paid plug-ins!
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {allProducts.map((user) => (  //will have to change from users to something else or figure this out
            <div
              key={user._id}
              className="rounded-md overflow-hidden shadow-lg"
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
