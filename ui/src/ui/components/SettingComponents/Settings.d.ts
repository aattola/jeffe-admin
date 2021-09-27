interface ButtonComponent {
  id: string
  type: 'Button'
  buttonText: string
  variant: 'white' | 'red' | 'unstyled'
  text?: string
  event?: string
}

export { ButtonComponent };
