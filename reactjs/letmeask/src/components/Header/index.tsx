import { useParams, useHistory, Link } from 'react-router-dom';

import { database } from '../../services/firebase';

import { RoomCode } from '../Roomcode';
import { Button } from '../Button';

import logoImg from '../../assets/images/logo.svg';

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
        <Link to="/">
          <img src={logoImg} alt="Logo letmeask" />
        </Link>
        {/* <ButtonToggleTheme /> */}
        <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
        </div>
      </div>
    </header>
  );
}
