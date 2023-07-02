import styles from "../styles/Interview.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from "@/components/buttons/icons/CloseIcon";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AccountCard from "@/components/accountCard/AccountCard";
import { useState } from "react";
import Square from "@/components/square";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image"; // Importa el componente Image desde next/image

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: { title: string; elements: string[] }[];
}

const Interview = ({ }) => {
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

  const profile1: IProfile = {
    id: "id1",
    avatar: "/pictures/cat-face-1.jpg",
    platform: "facebook",
    username: "The Fancy Cat",
    tastes: [
      {
        title: "Favoritos 1",
        elements: ["Carne", "Pescado"],
      },
      {
        title: "Favoritos 2",
        elements: ["Correr", "Cazar"],
      },
    ],
  };

  const profile2: IProfile = {
    id: "id2",
    avatar: "/pictures/woman-face-1.jpg",
    platform: "facebook",
    username: "Mujer",
    tastes: [
      {
        title: "Favoritos 1",
        elements: ["Hummus", "Naranjas", "Tortilla"],
      },
      {
        title: "Favoritos 2",
        elements: ["Saber y Ganar", "Pasapalabra"],
      },
      {
        title: "Favoritos 3",
        elements: ["Programación"],
      },
    ],
  };

  const [newProfile, setNewProfile] = useState<IProfile>({
    id: "",
    avatar: "",
    platform: "facebook",
    username: "",
    tastes: [],
  });

  // Estado para almacenar perfiles
  const [profiles, setProfiles] = useState([profile1, profile2]);

  // Estado para almacenar el perfil seleccionado actualmente
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

  // Estado para controlar si el modal de perfil está abierto o cerrado
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Estado para almacenar una lista de cuadrados con sus colores
  const [squares, setSquares] = useState([
    { id: 1, color: "secondary.dark" },
    { id: 2, color: "primary.dark" },
    { id: 3, color: "success.dark" },
  ]);

  // Maneja el evento de eliminación de un cuadrado
  const handleSquareDelete = (id: number) => {
    setSquares((prevSquares) =>
      prevSquares.filter((square) => square.id !== id)
    );
  };

  // Obtiene un color aleatorio de una lista predefinida
  const getRandomColor = () => {
    const colors = ["secondary.dark", "primary.dark", "success.dark"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Agrega un nuevo cuadrado a la lista
  const addSquare = () => {
    const newId = squares.length + 1;
    const newSquare = { id: newId, color: getRandomColor() };
    setSquares((prevSquares) => [...prevSquares, newSquare]);
  };

  // Maneja el evento de clic en un perfil
  const handleProfileClick = (profile: IProfile) => {
    setSelectedProfile(profile);
  };

  // Maneja el evento de agregar un nuevo perfil
  const handleAddProfile = () => {
    setNewProfile({
      id: "",
      avatar: "",
      platform: "facebook",
      username: "",
      tastes: [],
    });
    setIsProfileModalOpen(true);
  };

  // Maneja el evento de cierre del modal de perfil
  const handleModalClose = () => {
    setIsProfileModalOpen(false);
  };

  // Maneja el evento de guardar un nuevo perfil
  const handleSaveProfile = () => {
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    setNewProfile({
      id: "",
      avatar: "",
      platform: "facebook",
      username: "",
      tastes: [],
    });
    setIsProfileModalOpen(false);
  };

  // Maneja el cambio de título de un gusto (en el nuevo perfil)
  const handleTasteTitleChange = (index: number, title: string) => {
    setNewProfile((prevProfile) => {
      const updatedTastes = [...prevProfile.tastes];
      updatedTastes[index].title = title;
      return {
        ...prevProfile,
        tastes: updatedTastes,
      };
    });
  };

  // Maneja el cambio de un elemento de gusto (en el nuevo perfil)
  const handleTasteElementChange = (
    tasteIndex: number,
    elementIndex: number,
    value: string
  ) => {
    setNewProfile((prevProfile) => {
      const updatedTastes = [...prevProfile.tastes];
      updatedTastes[tasteIndex].elements[elementIndex] = value;
      return {
        ...prevProfile,
        tastes: updatedTastes,
      };
    });
  };

  // Maneja el evento de agregar un nuevo gusto (en el nuevo perfil)
  const handleAddTaste = () => {
    setNewProfile((prevProfile) => {
      const updatedTastes = [
        ...prevProfile.tastes,
        { title: "", elements: [] },
      ];
      return {
        ...prevProfile,
        tastes: updatedTastes,
      };
    });
  };

  // Maneja el evento de eliminar un gusto (en el nuevo perfil)
  const handleRemoveTaste = (index: number) => {
    setNewProfile((prevProfile) => {
      const updatedTastes = [...prevProfile.tastes];
      updatedTastes.splice(index, 1);
      return {
        ...prevProfile,
        tastes: updatedTastes,
      };
    });
  };

  return (
    <div className={styles["interview-main-container"]}>
      <div className={styles["interview-boxes-container"]}>
        {/* Renderiza los cuadrados */}
        {squares.map((square) => (
          <div key={square.id} className={styles["interview-box-container"]}>
            <Square
              color={square.color}
              onDelete={() => handleSquareDelete(square.id)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "4rem" }}>
        {/* Botón para agregar un nuevo cuadrado */}
        <Button variant="contained" startIcon={<AddIcon />} onClick={addSquare}>
          Agregar
        </Button>
      </div>

      <AccountCard
        profiles={profiles}
        editable={true}
        handleProfileClick={handleProfileClick}
        handleAddProfile={handleAddProfile}
      />

      {selectedProfile && (
        // Renderiza el componente Modal solo si existe un perfil seleccionado
        <Modal open={true} onClose={() => setSelectedProfile(null)}>
          <Box sx={style}>
            <Typography variant="h4">{selectedProfile.username}</Typography>
            <Image
              src={selectedProfile.avatar}
              alt={selectedProfile.username}
              width={300}
              height={300}
            />
            <ul>
              {selectedProfile.tastes.map((taste, index) => (
                <li key={index}>
                  <h5>{taste.title}</h5>
                  <ul>
                    {taste.elements.map((element, index) => (
                      <li key={index}>{element}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Box>
        </Modal>
      )}

      <Modal open={isProfileModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          {/* Título del modal */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar un nuevo Perfil
          </Typography>

          {/* Campo de entrada para el ID */}
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={newProfile.id}
              onChange={(e) =>
                setNewProfile({ ...newProfile, id: e.target.value })
              }
            />
          </div>

          {/* Campo de entrada para el Avatar */}
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="text"
              id="avatar"
              value={newProfile.avatar}
              onChange={(e) =>
                setNewProfile({ ...newProfile, avatar: e.target.value })
              }
            />
          </div>

          {/* Campo de selección para la Plataforma */}
          <div>
            <label htmlFor="platform">Plataforma:</label>
            <select
              id="platform"
              value={newProfile.platform}
              onChange={(e) =>
                setNewProfile({
                  ...newProfile,
                  platform: e.target.value as IPlatform,
                })
              }
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          {/* Campo de entrada para el Nombre de Usuario */}
          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={newProfile.username}
              onChange={(e) =>
                setNewProfile({ ...newProfile, username: e.target.value })
              }
            />
          </div>

          {/* Mapeo de los gustos del nuevo perfil */}
          {newProfile.tastes.map((taste, index) => (
            <div key={index}>
              {/* Campo de entrada para el título del gusto */}
              <label htmlFor="username">Gusto:</label>
              <input
                type="text"
                value={taste.title}
                onChange={(e) => handleTasteTitleChange(index, e.target.value)}
              />

              <ul>
                {/* Mapeo de los elementos del gusto */}
                {taste.elements.map((element, elementIndex) => (
                  <li key={elementIndex}>
                    {/* Campo de entrada para cada elemento del gusto */}
                    <input
                      type="text"
                      value={element}
                      onChange={(e) =>
                        handleTasteElementChange(
                          index,
                          elementIndex,
                          e.target.value
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <div style={{ marginBottom: "1rem" }}>
                {/* Botón para eliminar el gusto */}
                <Button
                  variant="contained"
                  onClick={() => handleRemoveTaste(index)}
                >
                  Eliminar Gusto
                </Button>
              </div>
            </div>
          ))}

          {/* Botón para agregar un nuevo gusto */}
          <Button variant="contained" onClick={handleAddTaste}>
            Agregar Gusto
          </Button>

          {/* Botón para agregar el perfil */}
          <Button
            variant="contained"
            onClick={() => {
              setProfiles([...profiles, newProfile]);
              setIsProfileModalOpen(false);
            }}
          >
            Agregar Perfil
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Interview;
