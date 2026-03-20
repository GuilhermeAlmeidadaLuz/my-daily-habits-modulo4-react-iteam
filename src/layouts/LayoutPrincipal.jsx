import { Outlet } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'

function LayoutPrincipal() {
    return (
        <div>
            <Header
          // titulo="My Daily Habits"
          // descricao="Construindo uma rotina melhor, um hábito por vez."
            />
            <Outlet />  {/* Aqui renderiza a página filha */}
            <Footer />
        </div>
    )
}

export default LayoutPrincipal  // faltou exportar no pdf