import './App.css'
import Footer from './components/Footer.jsx'

const BemVindo = ({ nomeUsuario, totalHabitos }) => {
  // Lógica antes do return
  const nomeFormatado = nomeUsuario.toUpperCase();
  const mensagem = totalHabitos > 0
    ? `Você tem ${totalHabitos} hábito(s) cadastrado(s).`
    : "Nenhum hábito cadastrado ainda. Que tal começar?";

  return (
    <div>
      <h2>Olá, {nomeFormatado}!</h2>
      <p>{mensagem}</p>
      <p>Média diária: {(totalHabitos * 30).toFixed(0)} atividades por mês</p>
    </div>
  );
};



App() {
  return (
    <div>
      <Cabecalho
        titulo="My Daily Habits"
        descricao="Construindo uma rotina melhor, um hábito por vez."
      />
      <BemVindo nomeUsuario="turma iteam" totalHabitos={5} />
      <Footer />
    </div>
  );
}

// function App() {
//   return (
//     <div>
//       <h1>My Daily Habits</h1>
//       <p>Gerencie seus hábitos de forma simples e visual</p>
    
//       <Footer/>
//     </div>
//   )
// }

export default App
