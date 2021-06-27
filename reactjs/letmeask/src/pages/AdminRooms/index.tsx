import {
  useEffect, useState, ReactNode, FormEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

import './styles.scss';

type RoomsTypes = Object;

export function AdminRooms() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const [roomCode, setRoomCode] = useState('');

  async function readAllRooms() {
    const allRooms = await database.ref('rooms/');

    if (allRooms) {
      allRooms.once('value', (roomsList) => {
        const Rooms = Object.keys(roomsList.val());

        setRooms(Rooms);
        console.log(Rooms);
      });
    }
  }

  useEffect(() => {
    readAllRooms();
  }, []);

  async function handleJoinRoom() {
    history.push(`/admin/rooms/${rooms[5]}`);
  }

  return (
    <div id="page-rooms">
      <header>
        <img src={logoImg} alt="Logo letmeask" />
      </header>

      <aside>
        <strong>Todas as salas</strong>
        {rooms.map((room, i) => (
          <li>
            {room}
            <button onClick={handleJoinRoom}>
              Entrar na sala
            </button>
            <button type="button">
              Encerrar sala
            </button>
          </li>
        ))}
        {rooms.length}
      </aside>
      <main>
        <div className="main-content">

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

          </form>
        </div>
      </main>
    </div>
  );
}
