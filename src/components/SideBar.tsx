import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  onChangeSelectedGenreId: (id: number) => void;
  selectedId: number;
}
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function SideBar({ onChangeSelectedGenreId, selectedId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);
  // Complete aqui
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => {
              onChangeSelectedGenreId(genre.id);
            }}
            selected={selectedId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
