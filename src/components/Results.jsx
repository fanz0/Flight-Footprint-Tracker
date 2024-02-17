import Lottie from "lottie-react";
import AirplaneAnimation from "../Animations/Animation - Airplane.json";

export const Results = ({ footprint, price, url, passengers }) => {
  return (
    <div className="flex bg-blue-400/20 mt-20 w-[90%] max-w-[1000px] h-fit mb-10 rounded-lg gap-10 flex-col md:flex-row p-5">
      <Lottie animationData={AirplaneAnimation} autoPlay={true} />
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-lg font-extrabold">
          Ecco i risultati del tuo viaggio:
        </h1>
        <p className="text-justify">
          Il tuo viaggio ha un'emissione di circa{" "}
          <strong>{footprint.toLocaleString("it-IT")}kg di CO₂</strong> a
          persona, l'equivalente di circa{" "}
          {(footprint * 700).toLocaleString("it-IT")}km effettuati con una
          macchina a benzina.
        </p>
        <p>
          Questo valore è approssimativo e può variare in base a molti fattori,
          come il tipo di veicolo e il consumo di carburante. Se vuoi verificare
          l'effetivo consumo, clicca{" "}
          <a
            className="text-blue-500"
            href="https://co2.myclimate.org/en/car_calculators/new"
            target="_blank"
          >
            QUI
          </a>
          .
        </p>
        <p className="bg-blue-500/50 rounded-lg p-1">
          Questo significa che l'intero volo ha un'emissione di circa{" "}
          <strong>
            {((footprint * passengers) / 1000).toLocaleString("it-IT")}{" "}
            tonnellate di CO₂
          </strong>{" "}
          !
        </p>
        <h2 className="font-extrabold">Constribuisci a ridurre l'impatto</h2>
        <p>
          Con una piccola donazione di {price / 100}€ hai la possibilità di
          compensare le emissioni del tuo viaggio e sostenere progetti che
          lavorano per un mondo più sostenibile. Non è solo un investimento nel
          tuo futuro, ma nel futuro di tutti noi.
        </p>
        <span>
          <a
            href={url}
            className="bg-green-700 hover:bg-green-500 rounded-lg p-1"
          >
            DONA
          </a>
        </span>
        <p>Grazie per aver scelto di volare con consapevolezza.</p>
      </div>
    </div>
  );
};
