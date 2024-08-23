import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TextToSpeechButton from "./TextToSpeechButton";
import CharacterSelector from "./CharacterSelector";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const ChatBox = () => {
  const [characters, setCharacters] = useState({ character1: '', character2: '' });
  const [conversation, setConversation] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleGenerate = async () => {
    const { character1, character2 } = characters;

    if (!character1 || !character2) {
      alert("Please enter both character names.");
      return;
    }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a short rap(like real and there should be atlest 8 chat) between two characters. Each character should have a couple of lines, and each line should be concise. Use the following placeholders for the characters' names: Don't give anything other than the dialogues. Don't explain your answer: Use the following placeholders for the characters' names: Character 1: ${character1}\nCharacter 2: ${character2}`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const generatedText = response.text();
      console.log(generatedText);
      setConversation(generatedText.split("\n"));
    } catch (error) {
      console.error("Error generating conversation:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(conversation[index]);
  };

  const handleSave = (index) => {
    const updatedConversation = [...conversation];
    updatedConversation[index] = editingText;
    setConversation(updatedConversation);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="p-4">
      <CharacterSelector onSelect={setCharacters} />
      <Button
        variant="outline"
        onClick={handleGenerate}
        className="mb-4 p-2 bg-blue-500 text-white rounded transition-all hover:bg-blue-600"
      >
        Generate Conversation
      </Button>
      <Card className="bg-gray-100 p-4 border border-gray-300 rounded shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Generated Conversation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {conversation.map((line, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200"
            >
              {editingIndex === index ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="mr-2 p-2 border border-gray-300 rounded flex-grow"
                />
              ) : (
                <p className="flex-grow">{line}</p>
              )}
              {editingIndex === index ? (
                <Button
                  variant="outline"
                  onClick={() => handleSave(index)}
                  className="p-2 bg-blue-500 text-white rounded mr-2 transition-all hover:bg-blue-600"
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleEdit(index)}
                  className="p-2 bg-yellow-500 text-white rounded mr-2 transition-all hover:bg-yellow-600"
                >
                  Edit
                </Button>
              )}
              <TextToSpeechButton text={line} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBox;
