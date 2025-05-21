import { Pressable, PressableProps } from "react-native"

interface ButtonProps extends PressableProps {
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <Pressable {...props} />
}
