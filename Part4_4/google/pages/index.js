import Head from 'next/head'
import { useState } from 'react';
import { Image,Input, Modal, Button } from 'antd'
import styles from '../styles/Home.module.css'


export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lists, setlists] = useState([{
    'imgUrl': '/images/dog.png',
    'name': '111',
    'linkUrl': 'http://www.baidu.com'
  }])
  const [name, setName] = useState('')
  const [linkUrl, setlinkUrl] = useState('')

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (name !== '' && linkUrl !== '') {
      lists.push({
        'imgUrl': '/images/dog.png',
        name,
        linkUrl,
      })
      setlists(lists.slice())
      setIsModalVisible(false);
      setName('')
      setlinkUrl('')
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setName('')
    setlinkUrl('')
  };

  const changeName = (ev) => {
    setName(ev.target.value)
  }
  
  const changeUrl = (ev) => {
    setlinkUrl(ev.target.value)
  }

  return (
    <>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Image src="/images/google.png" />
        <Input placeholder="Google" />
        <ul className={styles.ullist}>
          {lists.map((item, index) => {
            return <li key={index}><Image width="48px" src={item.imgUrl} /><p>{item.name}</p></li>
          })}
          <li onClick={showModal}>+</li>
        </ul>
      </div>
      <Modal title="添加标签" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input style={{'marginBottom': '15px'}} value={name} onChange={changeName} placeholder="输入名称" />
        <Input placeholder="Google" value={linkUrl} placeholder="输入网址" onChange={changeUrl} />
      </Modal>
    </>
  )
}
