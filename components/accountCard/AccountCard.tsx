import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./AccountCard.module.css";
import Link from "next/link";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: any;
}

export interface IAccountCard {
  profiles: IProfile[];
  editable?: boolean;
  handleProfileClick: (profile: IProfile) => void;
  handleAddProfile: () => void;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  handleProfileClick,
  handleAddProfile,
}) => {
  const [integrations, setIntegrations] = useState<IProfile[]>([]);

  useEffect(() => {
    setIntegrations(profiles);
  }, [profiles]);

  return (
    <Card>
      <div className={styles["card"]}>
        {integrations.map((item, index) => (
          <Button
          //Se estaba usando la misma clave (k1) para todos los elementos y se ha usado el index para generar claves unicas. k0,k1,k2... 
            key={`k${index}`}
            onClick={() => handleProfileClick(item)}
          >
            <Avatar alt={item.username} src={item.avatar} />
            {item.username}
          </Button>
        ))}
        {editable && (
          <div className={styles["empty-accounts"]}>
          <Button onClick={handleAddProfile}>
            <span className={styles["link"]}>Add profile</span>
          </Button>
        </div>
        )}
        
      </div>
    </Card>
  );
};

export default AccountCard;
