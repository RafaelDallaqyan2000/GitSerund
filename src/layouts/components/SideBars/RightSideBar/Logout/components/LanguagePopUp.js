import "./languagePopUpStyles.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { key: "am", name: "Հայերեն", id: 1 },
  { key: "en", name: "English", id: 2 },
];

export function LanguagePopUp({ ref }) {
  const [selectedLanguage, setSelectedLanguage] = useState("am");
  const { i18n } = useTranslation();

  useEffect(() => {
    setSelectedLanguage(localStorage.getItem("language"));
  }, []);

  const handleLanguageClick = (e) => {
    setSelectedLanguage(e.key);
    localStorage.setItem("language", e.key);
    i18n.changeLanguage(e.key);
  };

  return (
    <div ref={ref} className="languagePopUpContainer">
      {languages.map((e, i) => (
        <div
          key={e.id + e.key + i}
          onClick={() => handleLanguageClick(e)}
          className="everyPupUpItem"
        >
          <p>{e.name}</p>
          {selectedLanguage === e.key && (
            <img src={require("../../../../../../img/Check2.svg").default} />
          )}
        </div>
      ))}
    </div>
  );
}
