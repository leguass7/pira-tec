import React, { useContext, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { Context } from './Provider'
import { DropdownSection } from './Section'

const refDuration = 0.22

export default function DropdownRoot () {
  const { options, cachedId, getOptionById, targetId } = useContext(Context)

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById
  ])

  let [width, height, x] = [0, 0, 0]

  if (cachedOption) {
    const { optionCenterX, contentDimensions } = cachedOption

    width = contentDimensions?.width
    height = contentDimensions?.height
    x = optionCenterX - width / 2
  }

  const [hovering, setHovering] = useState(false)

  const isActive = targetId !== null || hovering

  /** First interaction */
  const [hasInteracted, setHasInteracted] = useState(false)
  const isFirstInteraction = isActive && !hasInteracted

  if (isFirstInteraction) {
    setTimeout(() => {
      if (!hasInteracted) setHasInteracted(true)
    }, 15)
  }

  // Active TimeOut
  useEffect(() => {
    if (isActive) return

    const timeout = setTimeout(
      () => setHasInteracted(false),
      refDuration * 1000 * 0.9
    )
    return () => clearTimeout(timeout)
  }, [isActive])

  return (
    <div style={{ perpective: 2000 }}>
      <motion.div className="dropdown-root"
        animate={{
          opacity: isActive ? 1 : 0,
          rotate: isActive ? 0 : -15
        }}
        transition={{
          opacity: { duration: refDuration, delay: 0.05 },
          rotateX: { duration: refDuration, delay: 0.05 }
        }}
      >
        <motion.div
          className="dropdown-container"
          animate={{
            x,
            width,
            height,
            pointerEvents: isActive ? 'unset' : 'none'
          }}
          transition={{
            ease: 'easeOut',
            x: isFirstInteraction ? { duration: 0 } : refDuration,
            width: { duration: isFirstInteraction ? 0 : refDuration * 0.93 },
            height: { duration: isFirstInteraction ? 0 : refDuration * 0.93 },
            // Bug fix
            pointerEvents: { delay: 0.05 }
          }}
        >
          <DropdownBackground />
          <motion.div
            animate= {{
              x: x - x
            }}
            transition={{
              x: isFirstInteraction ? { duration: 0 } : undefined
            }}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
          >
            {options.map((item) => (
            <DropdownSection key={item.id} option={item} />
            ))}
          </motion.div>

        </motion.div>

        <DropdownArrow isFirstInteraction={isFirstInteraction} />

      </motion.div>

    </div>
  )
}

function DropdownArrow ({ isFirstInteraction }) {
  const { cachedId, getOptionById } = useContext(Context)

  const cachedOption = useMemo(() => getOptionById(cachedId), [
    cachedId,
    getOptionById
  ])

  const x = cachedOption ? cachedOption.optionCenterX : 0

  return (
    <motion.div
      className="dropdown-arrow"
      initial={{
        opacity: 0
      }}
      animate={{
        x,
        pointerEvents: 'none',
        opacity: x > 0 ? 1 : 0
      }}
      transition={{
        ease: 'easeOut',
        x: { duration: isFirstInteraction ? 0 : refDuration }
      }}
    />
  )
}

DropdownArrow.propTypes = {
  isFirstInteraction: PropTypes.bool
}

export function DropdownBackground () {
  return (
    <motion.div>

    </motion.div>
  )
}
