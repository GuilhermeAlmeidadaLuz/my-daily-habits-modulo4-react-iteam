
function HabitCard( { nome, descricao='', meta, ativo = true, diasFeitos = 0, categoria = 'Geral', onRemover, onToggle } ) {
    const metaAtingida = diasFeitos >= meta

    const mensagemMeta = metaAtingida
        ? '🏆 Meta da semana atingida!'
        : `${diasFeitos} de ${meta} dias concluídos`

    return (
        <div className="habit-card">
            <h3>{nome}</h3>
            {descricao && <p>{descricao}</p>}
            <p>{mensagemMeta}</p>
            <small>Categoria: {categoria}</small>
            <br></br>
            <span>{ativo ? '✅Ativo' : '⏸ Pausado'}</span>

            {/* &&: um resultado ou nada */}
            {/* booleanos true/false não são renderizados pelo React */}
            {metaAtingida && (
                <p>⭐ Parabéns! Você manteve a sequência essa semana!</p>
            )}

            {/* onRemover: só aparece se o pai passar essa prop */}
            {onRemover && (
                <button type="button" onClick={onRemover}>
                    Remover
                </button>
            )}
            {onToggle && ( 
                <button type="button" onClick={onToggle}> 
                    {ativo ? 'Pausar' : 'Ativar'} 
                </button> 
            )}
        </div>
    )
}

export default HabitCard