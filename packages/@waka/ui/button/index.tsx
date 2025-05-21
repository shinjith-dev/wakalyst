interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <button {...props} />
}
