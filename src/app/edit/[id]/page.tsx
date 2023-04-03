import React from 'react'
import NewFormPage from '../../new/page';


interface MyPropsComponents {
    params: { id: string };
}

const page: React.FC<MyPropsComponents> = ({ params }) => {
  return (
    <NewFormPage params={params}/>
  )
}

export default page