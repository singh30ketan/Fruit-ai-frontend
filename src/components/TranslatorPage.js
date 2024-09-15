import React, { useEffect, useState } from "react";
import axios from "axios";

function TranslatorPage() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default language set to Spanish (es)
  const [preferredlang, setpreferredlang] = useState("");
  const [allLang, setallLang] = useState([]);

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
    // Add more languages as needed
  ];

  const handleTranslate = async () => {
    const url =
      "https://google-translate1.p.rapidapi.com/language/translate/v2";
    const data = new FormData();
    data.append("q", "Hello, world!");
    data.append("target", selectedLanguage);
    data.append("source", "en");

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "742c2ccc64msh8accbf5133a1892p15c130jsn140eb97cf649",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "Accept-Encoding": "application/gzip",
      },
      body: data,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const functiontoCallLang = async () => {
      const url =
        "https://google-translate1.p.rapidapi.com/language/translate/v2/languages";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "742c2ccc64msh8accbf5133a1892p15c130jsn140eb97cf649",
          "x-rapidapi-host": "google-translate1.p.rapidapi.com",
          "Accept-Encoding": "application/gzip",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setallLang(result.data.languages);
        console.log(result.data.languages);
      } catch (error) {
        console.error(error);
      }
    };
    functiontoCallLang();
  }, []);
  return (
    <div className="translator-page">
      <h1>Translator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />

      {/* Dropdown for selecting language */}
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {allLang?.map((lang) => (
          <option value={lang.language}>{lang.language}</option>
        ))}
      </select>

      <button onClick={handleTranslate}>Translate</button>

      <div>
        <h2>Translation</h2>
        <p>{translation}</p>
      </div>
    </div>
  );
}

export default TranslatorPage;
