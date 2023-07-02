import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@/components/buttons/icons/CloseIcon";
import styles from "../styles/Interview.module.css";

interface SquareProps {
  color: string;
  onDelete: (id: any) => void;
}

const Square: React.FC<SquareProps> = ({ color, onDelete }) => {
  return (
    <div className={styles["interview-main-container"]}>
    <div className={styles["interview-boxes-container"]}>
    <div className={styles["interview-box-container"]}>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: color,
          "&:hover": {
            backgroundColor: color,
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Button onClick={onDelete} variant="contained" startIcon={<CloseIcon />}>
        Delete
      </Button>
    </div>
      
    </div>
    </div>
  );
};

export default Square;
