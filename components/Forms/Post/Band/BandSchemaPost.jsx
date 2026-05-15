export const postSchema = [
  { name: 'title', label: 'Název příspěvku', type: 'text', required: true },
  { name: 'content', label: 'Obsah', type: 'textarea', required: true },
  { 
    name: 'visibility', 
    label: 'Kdo příspěvek uvidí', 
    type: 'select', 
    options: [
      { value: 'public', label: 'Veřejné' },
      { value: 'private', label: 'Pouze já' }
    ] 
  }
];