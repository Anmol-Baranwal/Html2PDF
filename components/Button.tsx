import React, { FC, ReactNode, MouseEventHandler } from 'react'
import { Icons } from './icons'

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center rounded-md border-2 border-text-100 bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-black/90"
  >
    {children}
    <Icons.download className="ml-2 h-4 w-4 text-white" />
  </button>
)

export default Button

// FC is an abbreviation for FunctionComponent.
// ButtonProps interface defines the type for props of the Button component.
// MouseEventHandler is a type for handling mouse events on elements.
// ReactNode is a type for a node that can be rendered as a React child.
// The onClick prop is annotated with MouseEventHandler<HTMLButtonElement>, indicating that it's a function accepting a mouse event on a button element.
// The children prop is annotated with ReactNode, indicating that it can accept any React node as children.
