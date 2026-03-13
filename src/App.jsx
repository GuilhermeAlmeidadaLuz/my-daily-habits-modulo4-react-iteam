import './App.css'
import BemVindo from './components/BemVindo.jsx'
import Footer from './components/Footer.jsx'
import HabitList from './components/HabitList.jsx'
import Header from './components/Header.jsx'
import SecaoHabitos from './components/SecaoHabitos.jsx'


function App() {
  const habits = [
    { id: 1, titulo: 'Exercício', meta: 5, ativo: true, diasFeitos: 5 },
    { id: 2, titulo: 'Leitura', meta: 7, ativo: true, diasFeitos: 3 },
    { id: 3, titulo: 'Meditação', meta: 7, ativo: false, diasFeitos: 0 },
    { id: 4, titulo: 'Hidratação', meta: 7, ativo: true, diasFeitos: 6 }
  ]

  return (
    <div>
      <Header
        titulo="My Daily Habits"
        descricao="Construindo uma rotina melhor, um hábito por vez."
      />
      <div className='bem-vindo'>
        <BemVindo nomeUsuario="turma iteam" totalHabitos={habits.length}/>
      </div>
      <SecaoHabitos titulo="Meus Hábitos">
        <HabitList habits={habits} />
      </SecaoHabitos>
      <Footer />
    </div>
  );
}
export default App
