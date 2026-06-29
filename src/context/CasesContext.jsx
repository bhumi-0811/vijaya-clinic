import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'dermavista_cases';
const CasesContext = createContext(null);

const loadCases = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function CasesProvider({ children }) {
  const [cases, setCases] = useState(loadCases);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  }, [cases]);

  const addCase = (data) => {
    const newCase = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      remarks: '',
      ...data,
    };

    setCases((current) => [newCase, ...current]);
    return newCase;
  };

  const updateCase = (id, updates) => {
    setCases((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  };

  const metrics = useMemo(() => {
    return {
      total: cases.length,
      pending: cases.filter((item) => item.status === 'Pending').length,
      completed: cases.filter((item) => item.status === 'Reviewed').length,
    };
  }, [cases]);

  return (
    <CasesContext.Provider value={{ cases, addCase, updateCase, metrics }}>
      {children}
    </CasesContext.Provider>
  );
}

export function useCases() {
  const context = useContext(CasesContext);
  if (!context) throw new Error('useCases must be used inside CasesProvider');
  return context;
}