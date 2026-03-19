import { createContext, useContext, useState, useEffect } from "react";

// Passo 2a - Criar a 'caixa global'
// createContext fica FORA de qualquer componente - cria o canal um vez
export const HabitsContext = createContext(null);

// Passo 2b - Criar o Provider
// Componente normal que envolve a árvore e disponilidade dados via value={}
export function HabitsProvider({ children }) {
  // Estado dos hábitos com lazy init lendo o localStorage
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("my-daily-habits");
    if (!stored)
      return [
        {
          id: 1,
          nome: "Exercício",
          descricao: "Treino de força",
          meta: 5,
          ativo: true,
          diasFeitos: 5,
        },
        {
          id: 2,
          nome: "Leitura",
          descricao: "Livro ou artigo",
          meta: 7,
          ativo: true,
          diasFeitos: 3,
        },
        {
          id: 3,
          nome: "Meditação",
          descricao: "Respiração e foco",
          meta: 7,
          ativo: false,
          diasFeitos: 0,
        },
        {
          id: 4,
          nome: "Hidratação",
          descricao: "Beber 2L de Água",
          meta: 7,
          ativo: true,
          diasFeitos: 6,
        },
      ];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  // Sincroniza com localStorage sempre que habits mudar
  useEffect(() => {
    localStorage.setItem("my-daily-habits", JSON.stringify(habits));
    document.title = `My Daily Habits - ${habits.length} hábito(s)`;
  }, [habits]);

  // Funções CRUD:
  const adicionarHabit = (novoHabit) => {
    setHabits((prev) => [...prev, novoHabit]);
  };

  const removerHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Toogle Func
  const toggleAtivo = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ativo: !h.ativo } : h)),
    );
  };

  return (
    <HabitsContext.Provider value={{ habits, adicionarHabit, removerHabit, toggleAtivo }}>
      {children}
    </HabitsContext.Provider>
  );
}

// Passo 2c - Hook customizado
// Padrão profissional: em vez de importar useContext + HabitsContext
// em cada componente, exportamos um hook pronto para uso.
export function useHabits() {
  return useContext(HabitsContext);
}
