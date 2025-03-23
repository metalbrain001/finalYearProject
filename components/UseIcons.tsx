import {
  Camera,
  Ban,
  Baby,
  Star,
  Ghost,
  Laugh,
  ThumbsDown,
  FilmIcon,
  DollarSign,
  CalendarDays,
  Bot,
  X,
  Clapperboard,
  Play,
  PlayCircle,
  Plus,
  BotMessageSquare,
  ThumbsUp,
} from "lucide-react";
import { JSX } from "react";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  fill?: string;
  className?: string;
}

// Default icon properties
const defaultProps: IconProps = {
  size: 24,
  color: "black",
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  fill: "none",
  className: "",
};

// Type definition for the icons object
type IconComponents = {
  [key: string]: (props?: IconProps) => JSX.Element;
};

// Hook to manage icons dynamically
const Icons = (): IconComponents => {
  return {
    Camera: (props) => <Camera {...defaultProps} {...props} />,
    Ban: (props) => <Ban {...defaultProps} {...props} />,
    Baby: (props) => <Baby {...defaultProps} {...props} />,
    Star: (props) => <Star {...defaultProps} {...props} />,
    Ghost: (props) => <Ghost {...defaultProps} {...props} />,
    Laugh: (props) => <Laugh {...defaultProps} {...props} />,
    ThumbsUp: (props) => <ThumbsUp {...defaultProps} {...props} />,
    ThumbsDown: (props) => <ThumbsDown {...defaultProps} {...props} />,
    StarIcon: (props) => <Star {...defaultProps} {...props} />,
    Film: (props) => <FilmIcon {...defaultProps} {...props} />,
    DollarSign: (props) => <DollarSign {...defaultProps} {...props} />,
    CalendarDays: (props) => <CalendarDays {...defaultProps} {...props} />,
    Bot: (props) => <Bot {...defaultProps} {...props} />,
    X: (props) => <X {...defaultProps} {...props} />,
    Clapperboard: (props) => <Clapperboard {...defaultProps} {...props} />,
    Play: (props) => <Play {...defaultProps} {...props} />,
    PlayCircle: (props) => <PlayCircle {...defaultProps} {...props} />,
    Plus: (props) => <Plus {...defaultProps} {...props} />,
    BotMessageSquare: (props) => (
      <BotMessageSquare {...defaultProps} {...props} />
    ),
  };
};

export default Icons;
