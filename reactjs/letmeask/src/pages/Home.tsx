import { useHistory } from 'react-router-dom';
import { Flex, FormControl, Input } from '@chakra-ui/react';

import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/logo-google.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <Flex w="100vw" h="100vh">
      <Flex flex="1" align="center" bg="purple.500" flexDir="column" justify="center">
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </Flex>

      <Flex flex="1" align="center" justify="center" flexDir="column">
        <Flex flexDir="column">
          <img src={logoImg} alt="Letmeask" />
          <Button
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>

          <div className="separator">ou entre em uma sala</div>

          <FormControl onSubmit={handleJoinRoom}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
}
