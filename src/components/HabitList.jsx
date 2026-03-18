import HabitCard from "./HabitCard";
import BemVindo from "./BemVindo";
import { useEffect, useState, useRef } from "react";

function HabitList() {
    // useState:
    const [habits, setHabits] = useState( () => {
        // Esta função executa UMA VEZ - na montagem
        const stored = localStorage.getItem('my-daily-habits')
        
        // Se não há nada salvo - usa o array inicial
        if (!stored) return [
            { id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7, ativo: true, diasFeitos: 3 },
            { id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
            { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de Água', meta: 7, ativo: true, diasFeitos: 6 }   
        ]

        // se há dados salvos - tenta fazer o parse
        try {
            return JSON.parse(stored)
        } catch {
            // Se o JSON estiver corrompido - volta pro array inicial
            return []
        }
    })

    const [novoNome, setNovoNome] = useState('')
    const [novaDescricao, setNovaDescricao] = useState('')
    const [novaCategoria, setNovaCategoria] = useState('')
    const [novaMeta, setNovaMeta] = useState(0)

    const [erroNome, setErroNome] = useState('')
    const [erroMeta, setErroMeta] = useState('')

    // useRef:
    const nomeInputRef = useRef(null)

    // useEffect:
    // useEffect(() => {
    //     const JsonStored = localStorage.getItem('my-daily-habits')
    //     const ObjectStored = JSON.parse(JsonStored)

    //     console.log("Elementos carregados do localStorage:", ObjectStored.length)
    //     console.log("Elementos no Array inicial:", habits.length)
    // }, [])

    useEffect( () => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits))
        document.title = `My Daily Habits - ${habits.length} hábito(s)`
    }, [habits])

    const handleChange = (e) => {
        const { name, value } = e.target
        // [name] é uma chave dinâmica — usa o valor de name como nome da propriedade
        if (name === 'novoNome') {
            setNovoNome(value)
            // Valida comprimento mínimo em tempo real
            if (value.length > 0 && value.length < 3) {
                setErroNome('O nome deve ter pelo menos 3 caracteres.')
            } else {
                setErroNome('')
            }
        }
        if (name === 'novaDescricao') setNovaDescricao(value)
        if (name === 'novaCategoria') setNovaCategoria(value)
        if (name === 'novaMeta') {
            const num = parseInt(value)
            setNovaMeta(value)

            if (num < 1 || num > 7) {
                setErroMeta('Meta deve ser entre 1 e 7 dias.')
            } else {
                setErroMeta('')
            }

        }
    }

    // Funções CRUD:

    const adicionarHabit = (event) => {
        // console.log('objeto event:', event)
        event.preventDefault()

        if (!novoNome.trim()) {
            // se novoNome é campo vazio
            alert('Informe um nome para o hábito.')
            return
        }

        // Bloqueia se há erro de validação
        if (erroNome) {
            nomeInputRef.current?.focus()
            return
        }

        if (erroMeta) {
            // nomeInputRef.current?.focus()
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

        // Devolve o foco para o campo nome - useRef em ação
        nomeInputRef.current?.focus()
    }
    
    const removerHabit = (id) => {
        // filtra os hábitos que não tem o id selecionada,
        // repassa para o setHabits o array de objetos com filtro sem o objeto com o id especificado
        // para que ele possa guardar este estado
        setHabits(habits.filter( habit => habit.id !== id ))
    }

    const limparHistorico = (event) => {
        console.log(event)
        localStorage.removeItem('my-daily-habits')
        setHabits([
            { id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7, ativo: true, diasFeitos: 3 },
            { id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
            { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de Água', meta: 7, ativo: true, diasFeitos: 6 }
        ])
    }

    const QuantidadeHabitosAtivos = habits.filter(h => h.ativo).length

    // retorno padrão estilo switch case quando as condições acima não são satisfeitas no fluxo do programa
    return (
        <>
            <div className='bem-vindo'>
                <BemVindo nomeUsuario="turma iteam" totalHabitos={habits.length}/>
                <p>{`Hábitos ativos: ${QuantidadeHabitosAtivos}`}</p>
            </div>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div>
                    <label>
                        Nome do hábito <span style={{color: "red", fontWeight: "bold"}}>*</span>
                        <input
                            type="text"
                            name="novoNome"
                            value={novoNome}
                            onChange={ handleChange }
                            ref={nomeInputRef}
                            placeholder="Digite aqui o seu hábito"
                        />
                    </label>
                    {erroNome && <p style={{ color: 'red', fontSize: '0.8rem'}}>{erroNome}</p>}
                </div>
                <div>
                    <label>
                        Descrição
                        <input 
                            type="text"
                            name="novaDescricao"
                            value={novaDescricao}
                            onChange={ handleChange }
                            placeholder="Digite aqui a descrição do seu hábito"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Categoria
                        <input 
                            type="text"
                            name="novaCategoria"
                            value={novaCategoria}
                            onChange={ handleChange }
                            placeholder="Digite a categoria que ele se encaixa"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Meta
                        <input 
                            type="number"
                            name="novaMeta"
                            value={novaMeta}
                            onChange={ handleChange }
                            min={0}
                            placeholder="Digite o número de dias que o hábito deve ocorrer"
                        />
                    </label>
                    {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroMeta}</p>}
                </div>
                <div className="buttons-container">
                    <button type="submit"> <span>✍</span> Adicionar hábito</button>
                    <button type="button" onClick={limparHistorico}> <span>🧹</span> Limpar histórico</button>
                </div>
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