import React, { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const App = () => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://stock-machine-test.herokuapp.com/api"
      );
      setLoading(false)
      if (!data) {
        alert("something went wrong...");
      }
      setData(data);
    } catch (error) {
      setLoading(false);
      alert("err", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setShow(false);
  }, [search]);

  const clicked = (data) => {
    setDetail(data);
    setShow(true);
  };

  const searchItems = () => {
    return data.filter((item) => item.Name.toLowerCase().includes(search));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-cyan-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
              Stocks
            </span>
          </a>
        </div>
      </nav>

      <div className="text-center bg-cyan-100 h-screen w-full">
        <br></br>
        <h6 className="text-black text-2xl md:text-5xl p-0">
          The easiest way to buy
        </h6>
        <h6 className="text-black text-2xl md:text-5xl p-0 leading-7">
          and sell stocks.
        </h6>
        <br />
        <p className="text-base text-black">
          Stock analysis and screening tool for <br /> investors in india.
        </p>
        <div className="py-5 h-screen bg-gray-300 px-2">
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-3xl">
            <div className="md:flex">
              <div className="w-full p-3">
                {/* search */}
                <div className="relative w-full md:max-w-2xl md:ml-8 shadow-xl">
                  <i className="absolute fa fa-search text-gray-400 top-5 left-4"></i>
                  <input
                    type="text"
                    className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-text"
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex justify-center mt-1">
                  <ul className="bg-white w-2/3 rounded-b-lg">
                    {show === false &&
                      search &&
                      searchItems().map((data, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            clicked(data);
                          }}
                          className="px-6 cursor-pointer py-4 font-semibold text-amber border-gray border-b border-gray-100 w-full rounded-t-lg"
                        >
                          {data.Name}
                        </li>
                      ))}
                  </ul>
                </div>
                <br />
                {loading ? (
                  <div className="items-center justify-center flex relative">
                    <TailSpin
                    height="40"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                    </div>
                ) : (
                  show && (
                    <div className="p-3 w-full bg-white rounded-xl">
                      <h1 className="text-start py-2 text-2xl font-extrabold">
                        {detail["Name"]}
                      </h1>
                      <div className="bg-gray p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 ">
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            Market Cap
                            <span className="text-amber font-bold ml-4">
                              ${detail["Market Cap"]}
                            </span>
                          </div>
                          <div className=" rounded-md md:flex-row flex-col items-center justify-center">
                            Dividend Yield
                            <span className="text-amber font-bold ml-4">
                              {detail["Dividend Yield"]}%
                            </span>
                          </div>
                          <div className=" rounded-md md:flex-row flex-col items-center justify-center">
                            Debt Equality
                            <span className="text-amber font-bold ml-4">
                              {detail["Debt to Equity"]}%
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            Current Pric
                            <span className="text-amber font-bold ml-4">
                              ${detail["Current Market Price"]}
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            ROCE
                            <span className="text-amber font-bold ml-4">
                              {detail["ROCE %"]}%
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            EPS
                            <span className="text-amber font-bold ml-4">
                              ${detail["EPS"]}
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            Stock P/E
                            <span className="text-amber font-bold ml-4">
                              ${detail["Stock P/E"]}
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-center">
                            ROE
                            <span className="text-amber font-bold ml-4">
                              {detail["ROE Previous Annum"]}%
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-between">
                            Reserves
                            <span className="text-amber font-bold ml-4">
                              {detail["Reserves"]}%
                            </span>
                          </div>
                          <div className="rounded-md md:flex-row flex-col items-center justify-between">
                            Debt
                            <span className="text-amber font-bold ml-4">
                              {detail["Debt"]}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
