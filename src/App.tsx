import { useState } from 'react'
import Aminations from './components/animation'
import Items from './components/items'
import { ILists } from './types'
export default function App() {
  const [lists, setLists] = useState<{ name: string; id: string }[]>([
    {
      name: 'c1',
      id: '1',
    },
    {
      name: 'c2',
      id: '2',
    },
    {
      name: 'c3',
      id: '3',
    },
    {
      name: 'c4',
      id: '4',
    },
    {
      name: 'c5',
      id: '5',
    },
    {
      name: 'c6',
      id: '6',
    },
    {
      name: 'c7',
      id: '7',
    },
    {
      name: 'c8',
      id: '8',
    },
    {
      name: 'c9',
      id: '9',
    },
    {
      name: 'c10',
      id: '10',
    },
    {
      name: 'c11',
      id: '11',
    },
    {
      name: 'c12',
      id: '12',
    },
    {
      name: 'c13',
      id: '13',
    },
    {
      name: 'c14',
      id: '14',
    },
  ])

  const swapNode = (newList: ILists[]) => {
    setLists([...newList])
  }
  return (
    <div className="ml-[100px]  w-[1000px] ">
      <Aminations lists={lists} swapNode={swapNode}>
        {lists.map((item) => {
          return <Items id={item.id} key={item.id} item={item} />
        })}
      </Aminations>
    </div>
  )
}
