import HabitCard from "./HabitCard";

function HabitList( { habits } ) {
    if (!habits) return null

    if (habits.length === 0) {
        return <p>Nenhum hábito cadastrado ainda, que tal começar?</p>
    }
    // retorno padrão estilo switch case quando as condições acima não são satisfeitas no fluxo do programa
    return (
        <ul>
            {habits.map( (habit) => (
                <li key={habit.id} style={{listStyle: 'none'}}>
                    <HabitCard 
                        titulo={habit.titulo}
                        meta={habit.id}
                        ativo={habit.ativo}
                        diasFeitos={habit.diasFeitos}
                        categoria={habit.categoria} // obrigatório ter, caso seja inserido
                    />
                </li>
            ) )}
        </ul>
    )
}

export default HabitList