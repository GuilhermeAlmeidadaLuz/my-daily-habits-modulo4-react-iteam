function ContadorTeste() {
  let contagem = 0

  const aumentar = () => {
    contagem = contagem + 1
    console.log('Valor atual:', contagem)
  }

  return(
    <div>
      <p>Cliques: {contagem}</p>
      <button onClick={aumentar}>+1</button>
    </div>
  )
}