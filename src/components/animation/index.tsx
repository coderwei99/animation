import React, { Children, ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { ILists } from '../../types'

const domOffsetMap: Map<string, { left: number; top: number }> = new Map()

interface Iprops {
  lists: ILists[]
  swapNode: (lists: ILists[]) => void
  children: ReactNode
}
function Aminations({ lists, swapNode, children }: Iprops) {
  // 记录拖拽的dom id 和 目标dom id
  const [domId, setDomId] = useState<{ dragDomId: string | null; targetDomId: string | null }>({
    dragDomId: '',
    targetDomId: '',
  })
  const divRef = useRef<HTMLDivElement>(null)
  const handleDeleteClick = (index: number) => {
    const newLists = [...lists]
    newLists.splice(index, 1)
    swapNode(newLists)
  }

  useLayoutEffect(() => {
    const donChildrenArray = [...(divRef.current!.children as unknown as HTMLElement[])]
    donChildrenArray.forEach((item) => {
      const prevRect = domOffsetMap.get(item.id)!
      if (!prevRect) {
        domOffsetMap.set(item.id, { left: item.offsetLeft, top: item.offsetTop })
        return
      }
      // Invert
      const invert = {
        left: prevRect?.left - item.offsetLeft,
        top: prevRect?.top - item.offsetTop,
      }
      const keyframes = [
        {
          transform: `translate(${invert.left}px, ${invert.top}px)`,
        },
        { transform: 'translate(0, 0)' },
      ]
      // Play 执行动画
      item.animate(keyframes, {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      })
      domOffsetMap.set(item.id, { left: item.offsetLeft, top: item.offsetTop })
    })
  })

  const dragStart = (dragDomId: string) => {
    setDomId({ ...domId, dragDomId })
  }
  const drop = (targetDomId: string) => {
    // 交换dom
    const dragDomIndex = lists.findIndex((item) => item.id === domId.dragDomId)!
    const tagerDomIndex = lists.findIndex((item) => item.id === targetDomId)!

    ;[lists[dragDomIndex], lists[tagerDomIndex]] = [lists[tagerDomIndex], lists[dragDomIndex]]

    swapNode(lists)
    setDomId({ ...domId, targetDomId })
  }
  return (
    <div className="relative flex flex-wrap w-[100%]" ref={divRef}>
      {
        Children.map(children, (Child, index) =>
          // return <Child dragStart={dragStart} drop={drop} onClick={() => handleDeleteClick(index)}></Child>
          {
            return React.cloneElement(Child as React.ReactElement, {
              dragStart,
              drop,
              onClick: () => handleDeleteClick(index),
            })
          }
        ) as []
      }
    </div>
  )
}

export default Aminations
