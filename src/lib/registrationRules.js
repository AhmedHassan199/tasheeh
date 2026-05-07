// Single source of truth for which scripts are taught and which combinations
// are allowed. The registration form imports from here; the data layer
// also references the same `id` keys so a teacher's scripts can be filtered.

export const SCRIPTS = [
  { id: 'naskh',   active: true,  exclusive: false },
  { id: 'thuluth', active: true,  exclusive: false },
  { id: 'diwani',  active: true,  exclusive: false },
  { id: 'jali',    active: true,  exclusive: true  }, // Thuluth Jali
  { id: 'ruqaa',   active: false, exclusive: false }, // launching soon
];

// Allowed two-script combinations (sorted alphabetically by id).
const VALID_COMBOS = [
  ['naskh', 'thuluth'].sort().join('|'),
  ['diwani', 'ruqaa'].sort().join('|'),
];

// Pure decision function. Tells the UI whether `candidate` can join the
// already-`selected` scripts. Reasons map to i18n keys under
// `register.ruleErrors.*`.
export function canAddScript(selected, candidate) {
  const script = SCRIPTS.find((s) => s.id === candidate);
  if (!script) return { ok: false, reason: 'invalid-combination' };
  if (!script.active) return { ok: false, reason: 'ruqaa-soon' };
  if (selected.includes(candidate)) return { ok: true }; // already selected = no-op

  if (selected.length >= 2) return { ok: false, reason: 'max-two-scripts' };

  // Exclusivity (Thuluth Jali)
  if (script.exclusive && selected.length > 0) {
    return { ok: false, reason: 'jali-must-be-solo' };
  }
  if (selected.some((id) => SCRIPTS.find((s) => s.id === id)?.exclusive)) {
    return { ok: false, reason: 'jali-locked' };
  }

  // Pair validation (only check on the second pick)
  if (selected.length === 1) {
    const combo = [...selected, candidate].sort().join('|');
    if (!VALID_COMBOS.includes(combo)) {
      return { ok: false, reason: 'invalid-combination' };
    }
  }

  return { ok: true };
}

// Filter teachers whose scripts cover what the user picked.
export function teachersForScripts(teachers, selectedScripts) {
  if (!selectedScripts.length) return teachers;
  return teachers.filter((t) =>
    selectedScripts.every((s) => t.scripts.includes(s))
  );
}
