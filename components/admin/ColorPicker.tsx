import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex flex-row items-center justify-between w-full p-2 rounded-md"
        style={{ backgroundColor: value }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="movie-color_picker"
          >
            {" "}
            Open Color Picker
          </button>
        )}

        {isOpen && (
          <HexColorPicker
            color={value}
            onChange={onPickerChange}
            className="hex-input"
          />
        )}
      </div>
      <div className="flex flex-row items-center w-full p-2 rounded-md">
        <p className="mr-1">#</p>
        <HexColorInput
          id="hex"
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
