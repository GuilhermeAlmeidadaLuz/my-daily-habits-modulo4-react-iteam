import './App.css'

import { Routes, Route } from 'react-router-dom'
import LayoutPrincipal from './layouts/LayoutPrincipal.jsx'
import PaginaInicio from './pages/PaginaInicio.jsx'
import PaginaHabitos from './pages/PaginaHabitos.jsx'
import PaginaDetalhes from './pages/PaginaDetalhes.jsx'
import PaginaNaoEncontrada from './pages/PaginaNaoEncondrada.jsx'
import PaginaNovoHabito from './pages/PaginaNovoHabito.jsx'

function App() {

  return (
      <div>
        <Routes>
          <Route element={<LayoutPrincipal />}>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/habitos" element={<PaginaHabitos />} />
            <Route path='/habitos/novo' element={<PaginaNovoHabito />} />
            <Route path="/habitos/:id" element={<PaginaDetalhes />} />
          </Route>
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </div>
  );
}
export default App

{/* <BemVindo className='bem-vindo' nomeUsuario="turma iteam"/> */}

{/* <div className='bem-vindo'>
        <BemVindo nomeUsuario="turma iteam" totalHabitos={habits.length}/>
        <p>{`Hábitos ativos: ${QuantidadeHabitosAtivos}`}</p>
        </div> */}
        {/* <SecaoHabitos titulo="Meus Hábitos">
          <HabitList />
        </SecaoHabitos>
         */}