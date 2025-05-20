const ToggleSwitch = ({
  isOn,
  onToggle,
  disabled = false
}: {
  isOn: boolean
  onToggle: () => void
  disabled?: boolean
}) => {
  return (
    <div
      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
      onClick={disabled ? undefined : onToggle}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </div>
  )
}

export default ToggleSwitch
