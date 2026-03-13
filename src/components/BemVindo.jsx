const BemVindo = ({ nomeUsuario, totalHabitos }) => {
  // Lógica antes do return
  const nomeFormatado = nomeUsuario.toUpperCase();
  const mensagem = totalHabitos > 0
    ? `Você tem ${totalHabitos} hábito(s) cadastrado(s).`
    : "Nenhum hábito cadastrado ainda. Que tal começar?";

  return (
    <div>
      <h2>Olá, {nomeFormatado}!</h2>
      <p>{mensagem}</p>
      <p>Média diária: {(totalHabitos * 30).toFixed(0)} atividades por mês</p>
    </div>
  );
};

export default BemVindo