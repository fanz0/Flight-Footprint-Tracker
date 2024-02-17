import { useReducer } from "react";
import { Results } from "./Results";

export const SearchForm = () => {
  const initialState = {
    inputValue1: "",
    inputValue2: "",
    airportDeparture: undefined,
    airportArrival: undefined,
    visible1: false,
    visible2: false,
    iataDeparture: undefined,
    iataArrival: undefined,
    flightResults: "",
    visibleResults: false,
    passengers: 1,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setInputValue1":
        return { ...state, inputValue1: action.value };
      case "setInputValue2":
        return { ...state, inputValue2: action.value };
      case "setAirportDeparture":
        return { ...state, airportDeparture: action.value };
      case "setAirportArrival":
        return { ...state, airportArrival: action.value };
      case "setVisible1":
        return { ...state, visible1: action.value };
      case "setVisible2":
        return { ...state, visible2: action.value };
      case "setIataDeparture":
        return { ...state, iataDeparture: action.value };
      case "setIataArrival":
        return { ...state, iataArrival: action.value };
      case "setFlightResults":
        return { ...state, flightResults: action.value };
      case "setVisibleResults":
        return { ...state, visibleResults: action.value };
      case "setPassengers":
        return { ...state, passengers: action.value };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleClickDeparture() {
    if (state.inputValue1) {
      fetch(`https://port-api.com/airport/search/${state.inputValue1}`)
        .then((response) => response.json())
        .then((data) =>
          dispatch({
            type: "setAirportDeparture",
            value: data.features.map((value) => value.properties),
          })
        )
        .catch((e) => console.log(e));
      dispatch({ type: "setVisible1", value: true });
    }
  }

  function handleClickArrival() {
    if (state.inputValue2) {
      fetch(`https://port-api.com/airport/search/${state.inputValue2}`)
        .then((response) => response.json())
        .then((data) =>
          dispatch({
            type: "setAirportArrival",
            value: data.features.map((value) => value.properties),
          })
        )
        .catch((e) => console.log(e));
      dispatch({ type: "setVisible2", value: true });
    }
  }

  function handleChangeOptionDeparture(e) {
    dispatch({ type: "setIataDeparture", value: e.target.value });
  }

  function handleChangeOptionArrival(e) {
    dispatch({ type: "setIataArrival", value: e.target.value });
  }

  function flightResults() {
    fetch(
      `https://api.goclimate.com/v1/flight_footprint?segments[0][origin]=${state.iataDeparture}&segments[0][destination]=${state.iataArrival}&cabin_class=economy&currencies[]=EUR`,
      {
        headers: {
          Authorization: "Basic " + btoa("36ec2ecd4524c7ae9df2c413:"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => dispatch({ type: "setFlightResults", value: data }))
      .catch((error) => console.log(error));
    if (state.visibleResults == false) {
      dispatch({ type: "setVisibleResults", value: true });
    } else {
      dispatch({ type: "setVisibleResults", value: false });
      dispatch({ type: "setVisibleResults", value: true });
    }
  }

  return (
    <div className="flex flex-col gap-5 w-[90%] max-w-[1000px] mt-20 items-center shadow-2xl p-2 shadow-blue-500/30 rounded-lg mb-20">
      <div className="flex flex-col rounded-lg items-center w-full justify-around gap-5">
        <label htmlFor="departure">Città di Partenza?</label>
        <div className="flex flex-col w-full items-center gap-5">
          <div className="flex gap-2 w-full justify-center">
            <input
              title="departure"
              className="rounded-lg text-black py-1 px-2 w-full max-w-[420px] focus:outline-none focus:ring-2 focus:ring-blue-500/80"
              type="text"
              onChange={(e) =>
                dispatch({ type: "setInputValue1", value: e.target.value })
              }
              value={state.inputValue1}
              required
            />
            <button
              className="px-1 rounded-lg bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-600"
              onClick={handleClickDeparture}
            >
              Cerca
            </button>
          </div>
          {state.visible1 && (
            <select
              className="rounded-lg text-black w-full max-w-[480px]"
              onChange={handleChangeOptionDeparture}
            >
              <option className="text-black">Seleziona un Aeroporto</option>
              {state.airportDeparture &&
                state.airportDeparture.map((item) => {
                  if (item.iata) {
                    return (
                      <option key={item.id} value={item.iata}>
                        {item.name}, {item.municipality}, {item.country.name}
                      </option>
                    );
                  } else {
                    return;
                  }
                })}
            </select>
          )}
        </div>
      </div>
      <div className="flex flex-col rounded-lg items-center w-full justify-around gap-5">
        <label htmlFor="departure">Città di Arrivo?</label>
        <div className="flex flex-col w-full items-center gap-5">
          <div className="flex gap-2 w-full justify-center">
            <input
              title="departure"
              className="rounded-lg text-black py-1 px-2 w-full max-w-[420px] focus:outline-none focus:ring-2 focus:ring-blue-500/80"
              type="text"
              onChange={(e) =>
                dispatch({ type: "setInputValue2", value: e.target.value })
              }
              value={state.inputValue2}
            />
            <button
              className="px-1 rounded-lg bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-600"
              onClick={handleClickArrival}
            >
              Cerca
            </button>
          </div>
          {state.visible2 && (
            <select
              className="rounded-lg text-black w-full max-w-[480px]"
              onChange={handleChangeOptionArrival}
            >
              <option className="text-black">Seleziona un Aeroporto</option>
              {state.airportArrival &&
                state.airportArrival.map((item) => {
                  if (item.iata) {
                    return (
                      <option key={item.id} value={item.iata}>
                        {item.name}, {item.municipality}, {item.country.name}
                      </option>
                    );
                  } else {
                    return;
                  }
                })}
            </select>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-around gap-5 mt-5">
        <label htmlFor="passengers">Numero di passeggeri</label>
        <input
          title="passengers"
          className="py-1 px-2 rounded-lg text-black max-w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500/80"
          type="number"
          onChange={(e) =>
            dispatch({ type: "setPassengers", value: e.target.value })
          }
        />
      </div>
      <button
        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-600"
        onClick={flightResults}
      >
        Calcola
      </button>
      {state.visibleResults && state.flightResults && (
        <Results
          footprint={state.flightResults.footprint}
          price={state.flightResults.offset_prices[0].amount}
          url={state.flightResults.offset_prices[0].offset_url}
          passengers={state.passengers}
        />
      )}
    </div>
  );
};
