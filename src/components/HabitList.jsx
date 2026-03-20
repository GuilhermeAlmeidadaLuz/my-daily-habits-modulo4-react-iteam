import { Link } from 'react-router-dom'  // <- adicionado
import HabitCard from "./HabitCard";
import { useHabits } from "../contexts/HabitsContext";

function HabitList() {
    // Hábitos e funções vêm do contexto - não do useState local
    const { habits, removerHabit, toggleAtivo } = useHabits()

    const QuantidadeHabitosAtivos = habits.filter(h => h.ativo).length

    // retorno padrão estilo switch case quando as condições acima não são satisfeitas no fluxo do programa
    return (
        <section>

            <div className="buttons-container">
                <Link to="/habitos/novo">Adicionar hábito</Link>
            </div>
            
            {habits.length === 0
                ? <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
                : <p>Você tem {habits.length} hábito(s) cadastrado(s). Ativo(s): {QuantidadeHabitosAtivos}/{habits.length}</p>
            }
            
            <ul style={{margin: 0, padding: 0}}>

                {habits.map( (habit) => (
                    <li key={habit.id} style={{listStyle: 'none'}}>
                        <HabitCard
                            id={habit.id} 
                            nome={habit.nome}
                            descricao={habit.descricao}
                            meta={habit.meta}
                            ativo={habit.ativo}
                            diasFeitos={habit.diasFeitos}
                            categoria={habit.categoria} // obrigatório ter, caso seja inserido
                            // função:
                            onRemover={ () => removerHabit(habit.id) }
                            onToggle={ () => toggleAtivo(habit.id)}
                        />
                    </li>
                ) )}
            </ul>
        </section>
    )
}

export default HabitList