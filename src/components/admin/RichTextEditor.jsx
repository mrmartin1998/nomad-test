'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="skeleton h-64 w-full"></div>
});

// Import styles only on client side
const QuillWrapper = ({ value, onChange, placeholder }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Import Quill styles dynamically
    import('react-quill/dist/quill.snow.css');
  }, []);

  if (!mounted) {
    return <div className="skeleton h-64 w-full"></div>;
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link', 'image',
    'blockquote', 'code-block', 'align'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder || 'Escribe el contenido de tu post...'}
        modules={modules}
        formats={formats}
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          minHeight: '300px'
        }}
      />
      <style jsx global>{`
        .ql-editor {
          min-height: 250px;
          font-size: 16px;
          line-height: 1.6;
        }
        .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          font-family: inherit;
        }
        .ql-editor p {
          margin-bottom: 1em;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default QuillWrapper;
