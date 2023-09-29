// Objet location délivré
// {
//   "type": "Feature",
//   "geometry": {
//       "type": "Point",
//       "coordinates": [
//           4.327862,   // longitude
//           43.815685   // latitude
//       ]
//      },
//   "properties": {
//       "label": "12 Rue du Temple 30900 Nîmes",
//       "score": 0.8879372727272726,
//       "housenumber": "12",
//       "id": "30189_7700_00012",
//       "name": "12 Rue du Temple",
//       "postcode": "30900",
//       "citycode": "30189",
//       "x": 806842.13,
//       "y": 6302750.74,
//       "city": "Nîmes",
//       "context": "30, Gard, Occitanie",
//       "type": "housenumber",
//       "importance": 0.76731,
//       "street": "Rue du Temple"
//   }
// }

import { Autocomplete } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";

// style
import "../style/input-address.css";

const InputAddress = ({ initValue = "", setLocation, validation = true }) => {
  // Init
  const [input, setInput] = useState(initValue);
  const [inputToSearch, setInputToSearch] = useState(initValue);
  const [suggestions, setSuggestions] = useState([]);
  const [inputSelected, setInputSelected] = useState(null);

  // functions
  const debounceInput = useRef(
    debounce((text) => {
      setInputToSearch(text);
    }, 500)
  ).current;

  const handleInput = (value) => {
    setInput(value);
    debounceInput(value);
  };

  // UseState
  useEffect(() => {
    const getSuggestions = async (input) => {
      try {
        let url = "https://api-adresse.data.gouv.fr/search/";
        url += "?q=" + input;
        url += "&limit=20";
        const response = await axios.get(url);
        const data = [];
        for (let i = 0; i < response.data?.features.length; i++) {
          if (i === 0) {
            setInputSelected(response.data.features[0]);
            if (!validation) {
              setLocation(response.data.features[0]);
            }
          }
          data.push(response.data.features[i].properties.label);
        }
        setSuggestions(data);
        // if (data.length <= 2) {
        //   setInputSelected(response.data.features[0]);
        //   if (!validation) {
        //     setLocation(response.data.features[0]);
        //   }
        // }
      } catch (error) {
        console.log(error.message);
        toast.warning("Un problème est survenu avec l'API de la BAN");
      }
    };
    if (inputToSearch && inputToSearch.length > 3) {
      getSuggestions(inputToSearch);
    } else {
      setInputSelected("");
      if (!validation) {
        setLocation("");
      }
    }
  }, [inputToSearch, setLocation, validation]);

  //Return
  return (
    <div className="input-address">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLocation(inputSelected);
        }}
      >
        <Autocomplete
          freeSolo
          size="small"
          fullWidth
          value={input}
          onInputChange={(event, newValue) => {
            handleInput(newValue);
          }}
          options={suggestions || null}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                color="primary"
                fullWidth
                label="Recherchez une adresse"
              />
            );
          }}
        />
        {validation && (
          <Button type="submit" color="primary" className="ok-button">
            OK
          </Button>
        )}
      </form>
    </div>
  );
};

export default InputAddress;
