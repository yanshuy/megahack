import { LanguageContext } from "@/context/LanguageContext";
import React, { useContext, ChangeEvent } from "react";

const LanguageSettings: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <h2>Language Settings</h2>
      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="bn">Bengali</option>
        <option value="mr">Marathi</option>
      </select>
    </div>
  );
};

export default LanguageSettings;
