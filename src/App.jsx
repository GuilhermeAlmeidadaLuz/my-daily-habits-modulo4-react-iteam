import './App.css'
import Footer from './components/Footer.jsx'
import HabitList from './components/HabitList.jsx'
import Header from './components/Header.jsx'
import SecaoHabitos from './components/SecaoHabitos.jsx'

function App() {

  return (
    <div>
      <Header
        titulo="My Daily Habits"
        descricao="Construindo uma rotina melhor, um hábito por vez."
      />
      
      <SecaoHabitos titulo="Meus Hábitos">
        <HabitList />
      </SecaoHabitos>
      <Footer />
    </div>
  );
}
export default App
