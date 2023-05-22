import './CatFactsList.css';
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import catFactsStore from "../store/CatFactsStore";
import { Audio } from "react-loader-spinner";

const CatFactsList = observer(() => {
  useEffect(() => {
    catFactsStore.fetchFacts();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !catFactsStore.isLoading) {
      catFactsStore.fetchFacts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div>
      <h1>Cat Facts</h1>
      <div className='main'>
      {catFactsStore.facts.map((fact, index) => (
        <div key={index} className="catFact">{fact.fact}</div>
      ))}
      {catFactsStore.isLoading && (
        <div>
          <Audio
            height="100"
            width="100"
            color="green"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      )}
      </div>
    </div>
  );
});

export default CatFactsList;
