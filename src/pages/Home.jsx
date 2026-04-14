import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user } = useAuth();
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Вітаю в LearnLingo!</h1>
      <p className="mt-4">
        Статус авторизації: {user ? `Ви увійшли як ${user.email}` : 'Ви не авторизовані'}
      </p>
    </div>
    )
}