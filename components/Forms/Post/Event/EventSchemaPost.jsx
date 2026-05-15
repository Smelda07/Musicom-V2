export const postSchema = [
  { name: 'title', label: 'Název akce', type: 'text', required: true },
  { name: 'date', label: 'Datum akce', type: 'text', required: true },
  { name: 'when', label: 'Čas akce (od)', type: 'text', required: true },
  { name: 'when2', label: 'Čas akce (do)', type: 'datetime', required: true, placeholder: 'Např. 25.12.2024 20:00'},
  { name: 'content', label: 'Obsah', type: 'textarea', required: true },
  { name: 'file', label: 'Soubor', type: 'upload', required: true },
];