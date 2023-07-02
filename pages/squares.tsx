import styles from "../styles/Interview.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import Square from "@/components/square";
import AddIcon from "@mui/icons-material/Add";

const Squares = ({}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [squares, setSquares] = useState([
    // Estado para almacenar los squares
    {
      id: 1,
      color: "red",
    },
    {
      id: 2,
      color: "green",
    },
    {
      id: 3,
      color: "blue",
    },
  ]);

  const handleSquareDelete = (id: number) => {
    // Elimina los squares en base a su id
    setSquares((prevSquares) =>
      prevSquares.filter((square) => square.id !== id)
    ); // Filtra los squares y mantiene solo aquellos que el id sea diferente
  };

  const getRandomColor = () => {
    // Obtiene un color aleatorio
    const colors = ["red", "green", "blue"];
    const randomIndex = Math.floor(Math.random() * colors.length); // Genera un índice aleatorio para seleccionar un color
    return colors[randomIndex]; // Devuelve el color aleatorio seleccionado
  };

  const addSquare = () => {
    // Agrega un nuevo square al array
    const newId = squares.length + 1; // Genera un nuevo id
    const newSquare = {
      id: newId,
      color: getRandomColor(), // Genera un color aleatorio
    };
    setSquares((prevSquares) => [
      ...prevSquares,
      newSquare, // Agrega el nuevo square al array
    ]);
  };

  return (
    <div className={styles["interview-main-container"]}>
      <div className={styles["interview-boxes-container"]}>
        {squares.map((square) => (
          <div key={square.id} className={styles["interview-box-container"]}>
            <Square
              color={square.color}
              onDelete={() => handleSquareDelete(square.id)}
            />{" "}
            {/* Renderiza cada cuadrado*/}{" "}
          </div>
        ))}{" "}
      </div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={addSquare}>
        Add
      </Button>{" "}
      {/* Renderiza un boton para agregar un nuevo square*/}{" "}
    </div>
  );
};

export default Squares;
