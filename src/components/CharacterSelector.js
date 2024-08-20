import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";

const CharacterSelector = ({ onSelect }) => {
  const [characters, setCharacters] = useState({ character1: '', character2: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacters({
      ...characters,
      [name]: value,
    });
    onSelect({ ...characters, [name]: value });
  };

  return (
    <Card className="mb-4 p-4 border border-gray-300 rounded">
      <CardHeader>
        <CardTitle>Type Characters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="character1" className="cursor-pointer">Character 1</Label>
          <input
            type="text"
            id="character1"
            name="character1"
            value={characters.character1}
            onChange={handleChange}
            className="ml-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter first character"
          />
        </div>
        <div>
          <Label htmlFor="character2" className="cursor-pointer">Character 2</Label>
          <input
            type="text"
            id="character2"
            name="character2"
            value={characters.character2}
            onChange={handleChange}
            className="ml-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter second character"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterSelector;
