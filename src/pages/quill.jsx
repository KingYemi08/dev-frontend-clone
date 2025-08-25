// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// function MyRichTextEditor() {
//   const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');

//   return (
//     <div>
//       <CKEditor
//         editor={ClassicEditor}
//         data={editorData}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           setEditorData(data);
//         }}
//         config={{
//           // Toolbar configuration, plugins, etc.
//           toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
//         }}
//       />
//       <h3>Preview:</h3>
//       <div dangerouslySetInnerHTML={{ __html: editorData }} />
//     </div>
//   );
// }

// export default MyRichTextEditor;