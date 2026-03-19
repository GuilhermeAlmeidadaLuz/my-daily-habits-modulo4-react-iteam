import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BemVindo from './components/BemVindo.jsx'
import SecaoHabitos from './components/SecaoHabitos.jsx'
import HabitList from './components/HabitList.jsx'
import { HabitsProvider } from './contexts/HabitsContext.jsx'

function App() {

  return (
    <HabitsProvider>
      <div>
        <Header
          titulo="My Daily Habits"
          descricao="Construindo uma rotina melhor, um hábito por vez."
        />
        <BemVindo className='bem-vindo' nomeUsuario="turma iteam"/>

        {/* <div className='bem-vindo'>
                <BemVindo nomeUsuario="turma iteam" totalHabitos={habits.length}/>
                <p>{`Hábitos ativos: ${QuantidadeHabitosAtivos}`}</p>
        </div> */}
        <SecaoHabitos titulo="Meus Hábitos">
          <HabitList />
        </SecaoHabitos>
        <Footer />
      </div>
    </HabitsProvider>
  );
}
export default App
