import { useHabits } from '../contexts/HabitsContext'

const BemVindo = ({ nomeUsuario }) => {
  // Lógica antes do return

  // Acesso direto ao contexto - sem props, sem intermediários
  const { habits } = useHabits()

  // Estado derivado - calculado na hora, sempre atualizado
  const totalHabitos = habits.length
  const habitosAtivos = habits.filter( (habit) => habit.ativo ).length

  const nomeFormatado = nomeUsuario.toUpperCase();
  
  // const mensagem = totalHabitos > 0
  //   ? `Você tem ${totalHabitos} hábito(s) cadastrado(s).`
  //   : "Nenhum hábito cadastrado ainda. Que tal começar?";

  // let somatorioMetasSemanal = 0
  // habits.forEach( (habit) => {
  //   somatorioMetasSemanal = somatorioMetasSemanal + habit.meta
  // } )

  let somatorioMetasSemanal = habits.reduce( (accumulator, habit) => {
    return (accumulator + habit.meta)
  }, 0 )

  return (
    <div>
      <h2>Olá, {nomeFormatado}!</h2>
      {/* <p>{mensagem}</p> */}
      <p>Você tem <strong>{totalHabitos}</strong> hábito(s) cadastrado(s).</p>
      <p><strong>{habitosAtivos}</strong> ativo(s) no momento.</p>
      {/* <p>Média mensal: {(totalHabitos * 30).toFixed(0)} repetições de hábito</p> */}
      <p>Total na Semana: {somatorioMetasSemanal.toFixed(0)} atividades por semana</p>
    </div>
  );
};

export default BemVindo