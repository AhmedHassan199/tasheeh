// Single source of truth for which scripts are taught and which combinations
// are allowed. The wizard imports from here; the data layer also references
// the same `id` keys so a teacher's scripts can be filtered.

export const SCRIPTS = [
  { id: 'naskh',   active: true,  exclusive: false },
  { id: 'thuluth', active: true,  exclusive: false },
  { id: 'diwani',  active: true,  exclusive: false },
  { id: 'jali',    active: true,  exclusive: true  }, // Thuluth Jali
  { id: 'ruqaa',   active: false, exclusive: false }, // launching soon (academic)
];

// Allowed two-script combinations (sorted alphabetically by id) for the
// long-term/intensive academic tracks.
const VALID_COMBOS = [
  ['naskh', 'thuluth'].sort().join('|'),
  ['diwani', 'ruqaa'].sort().join('|'),
];

// Foundation track teaches Naskh OR Ruqaa, single-pick only.
const FOUNDATION_SCRIPTS = ['naskh', 'ruqaa'];

// Pure decision function. Tells the UI whether `candidate` can join the
// already-`selected` scripts. `track` lets us apply special rules for the
// Foundation track. Reasons map to i18n keys under `register.ruleErrors.*`.
export function canAddScript(selected, candidate, track = null) {
  if (track === 'foundation') {
    if (!FOUNDATION_SCRIPTS.includes(candidate)) {
      return { ok: false, reason: 'foundation-not-supported' };
    }
    if (selected.length >= 1 && !selected.includes(candidate)) {
      return { ok: false, reason: 'foundation-single-only' };
    }
    return { ok: true };
  }

  const script = SCRIPTS.find((s) => s.id === candidate);
  if (!script) return { ok: false, reason: 'invalid-combination' };
  if (!script.active) return { ok: false, reason: 'ruqaa-soon' };
  if (selected.includes(candidate)) return { ok: true };

  if (selected.length >= 2) return { ok: false, reason: 'max-two-scripts' };

  if (script.exclusive && selected.length > 0) {
    return { ok: false, reason: 'jali-must-be-solo' };
  }
  if (selected.some((id) => SCRIPTS.find((s) => s.id === id)?.exclusive)) {
    return { ok: false, reason: 'jali-locked' };
  }

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

// Which script ids should be visible/selectable in a given track.
export function visibleScriptsFor(track) {
  if (track === 'foundation') {
    // Foundation enables Ruqaa as well, but disables Thuluth/Diwani/Jali.
    return SCRIPTS
      .filter((s) => FOUNDATION_SCRIPTS.includes(s.id))
      .map((s) => ({ ...s, active: true }));
  }
  return SCRIPTS;
}
