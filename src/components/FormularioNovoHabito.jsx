import { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useHabits } from "../contexts/HabitsContext";

function FormularioNovoHabito() {
    // Hábitos e funções vêm do contexto - não do useState local
    const { habits, adicionarHabit } = useHabits()
    const navigate = useNavigate()  // <- adicionado

    // Estado de UI - continua local (só o formulário usa)
    const [form, setForm] = useState({
        novoNome: '',
        novaDescricao: '',
        novaCategoria: '',
        novaMeta: '7'
    })
    
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

    const handleChange = (e) => {
        const { name, value } = e.target
        // [name] é uma chave dinâmica — usa o valor de name como nome da propriedade
        if (name === 'novoNome') {
            setForm( prev => ( {...prev, [name]: value} ) )
            // Valida comprimento mínimo em tempo real
            if (value.length > 0 && value.length < 3) {
                setErroNome('O nome deve ter pelo menos 3 caracteres.')
            } else {
                setErroNome('')
            }
        }
        if (name === 'novaDescricao') setForm(prev => ( {...prev, [name]: value } ) )
        if (name === 'novaCategoria') setForm(prev => ( {...prev, [name]: value} ) )
        if (name === 'novaMeta') {
            const num = parseInt(value)
            setForm(prev => ( {...prev, [name]: value} ) )

            if (num < 1 || num > 7) {
                setErroMeta('Meta deve ser entre 1 e 7 dias.')
            } else {
                setErroMeta('')
            }

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!form.novoNome.trim() || erroNome) {
            nomeInputRef.current?.focus()
            return
        }
        const novoHabit = {
            id: ( (habits.length !== 0) ? ( habits.at(-1).id + 1 ) : 1 ),
            nome: form.novoNome,
            descricao: form.novaDescricao,
            categoria: form.novaCategoria || 'Geral',
            meta: parseInt(form.novaMeta) || 7,
            ativo: true,
            diasFeitos: 0
        }

        adicionarHabit(novoHabit)   // <- função do contexto
        setForm( {novoNome: '', novaDescricao: '', novaCategoria: '', novaMeta: '7'} )
        setErroNome('')
        setErroMeta('')
        navigate('/habitos')    // <- redireciona após salvar      
        // nomeInputRef.current?.focus()
    }

    if (!habits) return null    // se a lista habits estiver vazia, habits é true. Mas se habits não aponta para nada, habits é false

    // Funções CRUD (foram para .src/contexts/HabitsContext.jsx):

    // const adicionarHabit = (event) => {
    //     // console.log('objeto event:', event)
    //     event.preventDefault()

    //     if (!novoNome.trim()) {
    //         // se novoNome é campo vazio
    //         alert('Informe um nome para o hábito.')
    //         return
    //     }

    //     // Bloqueia se há erro de validação
    //     if (erroNome) {
    //         nomeInputRef.current?.focus()
    //         return
    //     }

    //     if (erroMeta) {
    //         // nomeInputRef.current?.focus()
    //         return
    //     }

    //     const novoHabit = {
    //         id: ((habits.length !== 0) ? (habits[habits.length - 1].id + 1) : 1),
    //         nome: novoNome,
    //         descricao: novaDescricao,
    //         meta: novaMeta,
    //         ativo: true,
    //         diasFeitos: 0,
    //         categoria: novaCategoria || 'Geral',
    //     }

    //     setHabits([...habits, novoHabit])
    //     // console.log("Sem spreading:\n", [habits, novoHabit])
    //     // console.log("Com spreading:\n", [...habits, novoHabit])
        
    //     // Limpar os campos após adicionar:
    //     setNovoNome('')
    //     setNovaDescricao('')
    //     setNovaCategoria('')
    //     setNovaMeta('')

    //     // Devolve o foco para o campo nome - useRef em ação
    //     nomeInputRef.current?.focus()
    // }
    
    // const removerHabit = (id) => {
    //     // filtra os hábitos que não tem o id selecionada,
    //     // repassa para o setHabits o array de objetos com filtro sem o objeto com o id especificado
    //     // para que ele possa guardar este estado
    //     setHabits(habits.filter( habit => habit.id !== id ))
    // }

    // const limparHistorico = (event) => {
    //     // console.log(event)
    //     localStorage.removeItem('my-daily-habits')
    //     setHabits([
    //         { id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
    //         { id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7, ativo: true, diasFeitos: 3 },
    //         { id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
    //         { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de Água', meta: 7, ativo: true, diasFeitos: 6 }
    //     ])
    // }


    return (
        <section>
            
            <form onSubmit={handleSubmit} className="habit-form">
                <div>
                    <label>
                        Nome do hábito <span style={{color: "red", fontWeight: "bold"}}>*</span>
                        <input
                            type="text"
                            name="novoNome"
                            value={form.novoNome}
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
                            value={form.novaDescricao}
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
                            value={form.novaCategoria}
                            onChange={ handleChange }
                            placeholder="Digite a categoria que ele se encaixa"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Meta (dias por semana)
                        <input 
                            type="number"
                            name="novaMeta"
                            value={form.novaMeta}
                            onChange={ handleChange }
                            min={1}
                            max={7}
                            placeholder="Digite o número de dias que o hábito deve ocorrer"
                        />
                    </label>
                    {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroMeta}</p>}
                </div>
                <div className="buttons-container">
                    <button type="submit"> <span>💾</span> Salvar</button>
                    {/* <button type="button" onClick={limparHistorico}> <span>🧹</span> Limpar histórico</button> */}
                </div>
            </form>
            <Link to='/habitos'>Voltar</Link>
        </section>
    )
}

export default FormularioNovoHabito

// const [novoNome, setNovoNome] = useState('')
    // const [novaDescricao, setNovaDescricao] = useState('')
    // const [novaCategoria, setNovaCategoria] = useState('')
    // const [novaMeta, setNovaMeta] = useState(0)