import { useEffect } from 'react'
import styles from "./feed.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'
import { useLocation, Link } from "react-router-dom";
import FeedList from "../../components/feed-list/feed-list"
import StatusBoard from "../../components/status-board/status-board"

export const FeedPage = () => {
  const dispatch = useDispatch()
  const url = 'wss://norma.nomoreparties.space/orders/all'
  useEffect(() => {
    dispatch(wsConnectionStart(url))

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [])
  const ordersInfo = useSelector(state => state.wsReducer.ordersInfo)
  const wsConnected = useSelector(state => state.wsReducer.wsConnected)
  const wsError = useSelector(state => state.wsReducer.wsError)


  return (wsConnected && ordersInfo &&

    <>
      <h1 className={styles.heading}>
        Лента заказов
      </h1>
      <div className={styles.content}>

        <section className={styles.section}>
          <FeedList />
        </section>

        <section className={styles.status}>

          <StatusBoard />

        </section>

      </div>
    </>


  )
}

