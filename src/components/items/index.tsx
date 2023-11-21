export default function Items({
  item,
  id,
  onClick,
  dragStart,
  drop,
}: {
  id?: string
  item?: { name: string; id: string }

  onClick?: () => void
  dragStart?: (dragDomId: string) => void
  drop?: (dragDomId: string) => void
}) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragStart?.(e.currentTarget.id)
  }

  const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    drop?.(e.currentTarget.id)
  }

  return (
    <div
      id={id}
      draggable
      className="w-[200px] mt-[10px] h-[200px] flex-shrink-0 mr-[20px] bg-yellow-300"
      // 需要用户抛出的事件
      onDragStart={handleDragStart}
      onDragOver={handleDragover}
      onDrop={handleDrop}
    >
      <div>{item?.name}</div>
      <button className=" border border-red-500" onClick={onClick}>
        删除
      </button>
    </div>
  )
}
