import { useState } from 'react';
import { Checkbox } from "../components/ui/checkbox"; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";


const characters = [
  'Donald Trump',
  'Peter Griffin',
  'Kamala Harris',
  'Ryan Reynolds (Deadpool)',
  'Hugh Jackman (Wolverine)'
];

const CharacterSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (value) => {
    const updatedSelected = selected.includes(value)
      ? selected.filter(char => char !== value)
      : [...selected, value];

    setSelected(updatedSelected);
    onSelect(updatedSelected);
  };

  return (
    <Card className="mb-4 p-4 border border-gray-300 rounded">
      <CardHeader>
        <CardTitle>Select Characters</CardTitle>
      </CardHeader>
      <CardContent>
        {characters.map((char) => (
          <div key={char} className="mb-2 flex items-center">
            <Checkbox
              id={char}
              checked={selected.includes(char)}
              onCheckedChange={() => handleChange(char)}
              className="mr-2"
            />
            <Label htmlFor={char} className="cursor-pointer">{char}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CharacterSelector;
