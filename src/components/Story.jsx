import { useState, useEffect } from 'react'
import axios from 'axios'
import './Story.scss';

const Story = () => {
  const [load, setLoad] = useState(true)
  const [theQisa, setTheQisa] = useState({
    title: "",
    bookName: "",
    randomStory: "https://qisa.herokuapp.com/api/v1/Random/A"
  })
  const [title, setTitle] = useState([])
  const [qisa, setQisa] = useState([])
  const [bookName, setBookName] = useState([])

  useEffect(() => {
    const newQisa = async() => {
      const res = await axios.get("https://qisa.herokuapp.com/api/v1/Random/A")
      setTitle(res.data.title)
      setQisa(res.data.qisa)
      setBookName(res.data.bookName)
    }
    newQisa()
    setTimeout(() => {
      setLoad(false)
    }, 1000);
  }, [theQisa])

  const changeStory = () => {
    const randomNumber = Math.floor(Math.random() * qisa.length)
    setTheQisa((prevQisa) => ({
      ...prevQisa,
      randomStory: randomNumber
    }))
  }

  const Qisa = () => {
    return (
      <div>
        <p>اسم القصة : {title}</p>
        <p>{qisa}</p>
        <p>اسم الكتاب: {bookName}</p>
      </div>
    )
  }

  const Loader = () => {
    return (
      <div class="loader"></div>
    )
  }

  return (
    <main>
      <h1>في كل مرة تضغط فيها على الزر ، تظهر لك قصة جديدة</h1>
      {load ? (<Loader />) : (<Qisa />)}
      <button onClick={changeStory}>غير القصة</button>
    </main>
  );
}

export default Story;
