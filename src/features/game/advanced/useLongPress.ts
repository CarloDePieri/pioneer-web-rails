import React, { useCallback, useRef, useState } from "react"

interface PressHandlers<T, P> {
  onLongPress: (
    e: React.MouseEvent<T> | React.TouchEvent<T>,
    payload?: P,
  ) => void
  onPressStart?: (
    e: React.MouseEvent<T> | React.TouchEvent<T>,
    payload?: P,
  ) => void
  onPressEnd?: (
    e: React.MouseEvent<T> | React.TouchEvent<T>,
    wasLongPressTriggered: boolean,
    payload?: P,
  ) => void
  onClick?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void
}

interface Config {
  delay?: number
  shouldPreventDefault?: boolean
}

export function isTouchEvent(e: Event): e is TouchEvent {
  return e && "touches" in e
}

function preventDefault(e: Event) {
  if (!isTouchEvent(e)) return

  if (e.touches.length < 2 && e.preventDefault) {
    e.preventDefault()
  }
}

export default function useLongPress<T, P>(
  { onLongPress, onClick, onPressStart, onPressEnd }: PressHandlers<T, P>,
  { delay = 300, shouldPreventDefault = true }: Config = {},
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeout = useRef<NodeJS.Timeout>()
  const target = useRef<EventTarget>()

  const start = useCallback(
    (e: React.MouseEvent<T> | React.TouchEvent<T>, payload?: P) => {
      const clonedEvent = { ...e }

      if (shouldPreventDefault && e.target) {
        e.target.addEventListener("touchend", preventDefault, {
          passive: false,
        })
        target.current = e.target
      }

      if (onPressStart) {
        onPressStart(clonedEvent, payload)
      }
      timeout.current = setTimeout(() => {
        onLongPress(clonedEvent, payload)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, onPressStart, delay, shouldPreventDefault],
  )

  const clear = useCallback(
    (
      e: React.MouseEvent<T> | React.TouchEvent<T>,
      shouldTriggerClick = true,
      payload?: P,
    ) => {
      timeout.current && clearTimeout(timeout.current)
      shouldTriggerClick && !longPressTriggered && onClick?.(e)

      if (onPressEnd) {
        onPressEnd(e, longPressTriggered, payload)
      }

      setLongPressTriggered(false)

      if (e.target instanceof HTMLElement) {
        e.target.blur()
      }

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault)
      }
    },
    [shouldPreventDefault, onClick, onPressEnd, longPressTriggered],
  )

  return (payload?: P) => {
    return {
      onMouseDown: (e: React.MouseEvent<T>) => start(e, payload),
      onTouchStart: (e: React.TouchEvent<T>) => start(e, payload),
      onMouseUp: (e: React.MouseEvent<T>) => clear(e, true, payload),
      onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
      onTouchEnd: (e: React.TouchEvent<T>) => clear(e, true, payload),
    }
  }
}
