import { Link } from 'react-router-dom'


function HabitCard( { id, nome, descricao='', meta, ativo = true, diasFeitos = 0, categoria = 'Geral', onRemover, onToggle } ) {
    const metaAtingida = diasFeitos >= meta

    // const mensagemMeta = metaAtingida
    //     ? '🏆 Meta da semana atingida!'
    //     : `${diasFeitos} de ${meta} dias concluídos`

    return (
        <div className="habit-card">

            <div className="habit-card-header">
                <h3>{nome}</h3>
                <span style={{ color: ativo ? '#16a34a':'#9ca3af' }}>
                    {ativo ? '✅Ativo' : '⏸ Pausado'}
                </span>
            </div>
            <p>{descricao}</p>
            <small>Categoria: {categoria}</small>

            <p>{metaAtingida
                ? '🏆 Meta da semana atingida!'
                : `${diasFeitos} de ${meta} dias concluídos`}
            </p>

            {metaAtingida && (<p>⭐ Parabéns! Você manteve a sequência essa semana!</p>)}
            
            <div className="habit-card-acoes">
                {/* Link para a página de detalhes - usa o id do hábito na URL */}
                <Link to={`/habitos/${id}`} className='btn-detalhes'>   {/* pdf com erro: /habito/ deve ser /habitos/ */}
                    Ver detalhes
                </Link>

                {/* onRemover: só aparece se o pai passar essa prop */}
                {onRemover && (
                    <button onClick={onRemover} className='btn-remover-card'>
                        Remover
                    </button>
                )}

                {onToggle && ( 
                    <button onClick={onToggle} className='btn-toggle-status'> 
                        {ativo ? 'Pausar' : 'Ativar'} 
                    </button> 
                )}
            </div>


        </div>
    )
}

export default HabitCard


{/* {descricao && <p>{descricao}</p>} */}
            {/* <p>{mensagemMeta}</p> */}
            {/* <br></br> */}

            {/* &&: um resultado ou nada */}
            {/* booleanos true/false não são renderizados pelo React */}