import { useParams, useHistory, Link } from 'react-router-dom';

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
      endedAt: true,
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
