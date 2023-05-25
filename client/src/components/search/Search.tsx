import React, { FC, useState, useEffect } from "react";
import Exresice from "../exercises/exercise";
import { constants } from "buffer";

interface SearchProps {
  setExerciseseDisplay: CallableFunction;
  exercises: Exresice[];
}

const Search: FC<SearchProps> = ({ setExerciseseDisplay, exercises }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [target, setTarget] = useState<string>("All");

  const handleSearch = (ev: any) => {
    setSearchValue(ev.target.value);
  };

  const handleTarget = (ev: any) => {
    setTarget(ev.target.value);
  };

  const handleNewSearch = () => {
    const regex = new RegExp(`^${searchValue}`);
    const newArr = exercises.filter((e) => e.name.match(regex));

    if (target != "All") {
      setExerciseseDisplay(newArr.filter((e) => e.target == target));
    } else {
      setExerciseseDisplay(newArr);
    }
  };

  useEffect(() => {
    handleNewSearch();
  }, [searchValue, target]);

  return (
    <div className="search">
      <input
        onInput={handleSearch}
        className="search__input"
        type={"text"}
        placeholder={`🔎 Search`}
      />
      <select className="search__target" onChange={handleTarget}>
        <option value="All">All</option>
        <option value="Chest">Chest</option>
        <option value="Back">Back</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Hands">Hands</option>
        <option value="Abs">Abs</option>
        <option value="Full">Full Body</option>
      </select>
    </div>
  );
};

export default Search;
