import { Text } from "react-native"

export default function HighlightText({
  text,
  query,
  className,
  highlightClassName = "text-[#FFB52C]",
}) {
  if (!query) {
    return <Text className={className}>{text}</Text>
  }

  const regex = new RegExp(`(${query})`, "ig")
  const parts = text.split(regex)

  return (
    <Text className={className}>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === query.toLowerCase()

        return (
          <Text
            key={index}
            className={isMatch ? highlightClassName : ""}
          >
            {part}
          </Text>
        )
      })}
    </Text>
  )
}
