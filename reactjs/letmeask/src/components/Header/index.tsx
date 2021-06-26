import { useParams, useHistory } from 'react-router-dom';

import { RoomCode } from '../Roomcode';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../Button';

import { database } from '../../services/firebase';

type RoomParams = {
  id: string
}

export function Header() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" />
        <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
        </div>
      </div>
    </header>
  );
}
