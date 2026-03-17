import HabitCard from "./HabitCard";
import BemVindo from "./BemVindo";
import { useEffect, useState } from "react";

function HabitList() {
    const [habits, setHabits] = useState([
        { id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
        { id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7, ativo: true, diasFeitos: 3 },
        { id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
        { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de Água', meta: 7, ativo: true, diasFeitos: 6 }   
    ])

    const [novoNome, setNovoNome] = useState('')
    const [novaDescricao, setNovaDescricao] = useState('')
    const [novaCategoria, setNovaCategoria] = useState('')
    const [novaMeta, setNovaMeta] = useState(0)

    // useEffect:
    useEffect( () => {
        document.title = `My Daily Habits - ${habits.length} hábito(s)`
    }, [habits])

    useEffect(() => {
        console.log('✅ HabitList montou')
        return () => {
            console.log('❌ HabitList será desmontado')
        }
    }, [])

    // Funções CRUD:

    const adicionarHabit = (event) => {
        // console.log('objeto event:', event)
        event.preventDefault()

        if (!novoNome.trim()) {
            // se novoNome é campo vazio
            alert('Informe um nome para o hábito.')
            return
        }

        const novoHabit = {
            id: ((habits.length !== 0) ? (habits[habits.length - 1].id + 1) : 1),
            nome: novoNome,
            descricao: novaDescricao,
            meta: novaMeta,
            ativo: true,
            diasFeitos: 0,
            categoria: novaCategoria || 'Geral',
        }

        setHabits([...habits, novoHabit])
        // console.log("Sem spreading:\n", [habits, novoHabit])
        // console.log("Com spreading:\n", [...habits, novoHabit])
        
        // Limpar os campos após adicionar:
        setNovoNome('')
        setNovaDescricao('')
        setNovaCategoria('')
        setNovaMeta('')
    }
    
    const removerHabit = (id) => {
        // filtra os hábitos que não tem o id selecionada,
        // repassa para o setHabits o array de objetos com filtro sem o objeto com o id especificado
        // para que ele possa guardar este estado
        setHabits(habits.filter( habit => habit.id !== id ))
    }

    // retorno padrão estilo switch case quando as condições acima não são satisfeitas no fluxo do programa
    return (
        <>
            <div className='bem-vindo'>
                <BemVindo nomeUsuario="turma iteam" totalHabitos={habits.length}/>
            </div>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div>
                    <label>
                        Nome do hábito <span style={{color: "red", fontWeight: "bold"}}>*</span>
                        <input
                            type="text"
                            value={novoNome}
                            onChange={ (e) => setNovoNome(e.target.value) }
                            placeholder="Digite aqui o seu hábito"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                        <input 
                            type="text"
                            value={novaDescricao}
                            onChange={ (e) => setNovaDescricao(e.target.value) }
                            placeholder="Digite aqui a descrição do seu hábito"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Categoria
                        <input 
                            type="text"
                            value={novaCategoria}
                            onChange={ (e) => setNovaCategoria(e.target.value) }
                            placeholder="Digite a categoria que ele se encaixa"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Meta
                        <input 
                            type="number"
                            value={novaMeta}
                            onChange={ (e) => setNovaMeta( parseInt(e.target.value) ) }
                            min={0}
                            placeholder="Digite o número de dias que o hábito deve ocorrer"
                        />
                    </label>
                </div>
                <button type="submit">Adicionar hábito</button>
            </form>
            <ul style={{margin: 0, padding: 0}}>
                {habits.length === 0
                    ? <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
                    : <p>Você tem {habits.length} hábito(s) cadastrado(s).</p>
                }

                {habits.map( (habit) => (
                    <li key={habit.id} style={{listStyle: 'none'}}>
                        <HabitCard 
                            nome={habit.nome}
                            descricao={habit.descricao}
                            meta={habit.meta}
                            ativo={habit.ativo}
                            diasFeitos={habit.diasFeitos}
                            categoria={habit.categoria} // obrigatório ter, caso seja inserido
                            // função:
                            onRemover={ () => removerHabit(habit.id) }
                        />
                    </li>
                ) )}
            </ul>
        </>
    )
}

export default HabitList