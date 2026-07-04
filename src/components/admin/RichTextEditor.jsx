import React, { useRef, useEffect } from "react";
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link, Palette, Trash2, Undo, Redo
} from "lucide-react";

export const RichTextEditor = ({ value, onChange, placeholder = "Write here..." }) => {
  const editorRef = useRef(null);
  const isLocalUpdateRef = useRef(false);

  // Sync external changes (e.g., loading an article to edit, or resetting) to the DOM
  useEffect(() => {
    if (editorRef.current) {
      if (isLocalUpdateRef.current) {
        // Change originated from user typing; skip updating DOM to prevent caret jump
        isLocalUpdateRef.current = false;
        return;
      }
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      isLocalUpdateRef.current = true;
      // If editor contains empty tags or br, send empty string to state
      onChange(html === "<br>" || html === "" ? "" : html);
    }
  };

  const executeCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleColorChange = (e) => {
    executeCommand("foreColor", e.target.value);
  };

  const handleBgColorChange = (e) => {
    executeCommand("hiliteColor", e.target.value);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
      {/* Self-contained CSS for placeholder styling */}
      <style>{`
        .custom-editor-editable:empty:before {
          content: attr(placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}</style>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-white border-b border-slate-200 text-slate-600">
        
        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => executeCommand("undo")}
          title="Undo"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("redo")}
          title="Redo"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Text Formats */}
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          title="Bold"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors font-bold cursor-pointer"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          title="Italic"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors italic cursor-pointer"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          title="Underline"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors underline cursor-pointer"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("strikeThrough")}
          title="Strikethrough"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors line-through cursor-pointer"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Headings */}
        <select
          onChange={(e) => executeCommand("formatBlock", e.target.value)}
          title="Text Style"
          className="px-2 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          defaultValue="<p>"
        >
          <option value="<p>">Paragraph</option>
          <option value="<h1>">Heading 1</option>
          <option value="<h2>">Heading 2</option>
          <option value="<h3>">Heading 3</option>
          <option value="<pre>">Monospace</option>
        </select>

        {/* Font Family */}
        <select
          onChange={(e) => executeCommand("fontName", e.target.value)}
          title="Font Family"
          className="px-2 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          defaultValue="Inter"
        >
          <option value="Inter, sans-serif">Inter</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier New, monospace">Courier</option>
          <option value="Impact, sans-serif">Impact</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => executeCommand("fontSize", e.target.value)}
          title="Font Size"
          className="px-2 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Extra Large</option>
        </select>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Alignments */}
        <button
          type="button"
          onClick={() => executeCommand("justifyLeft")}
          title="Align Left"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyCenter")}
          title="Align Center"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyRight")}
          title="Align Right"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyFull")}
          title="Justify"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          title="Bulleted List"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          title="Numbered List"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Colors */}
        <div className="relative flex items-center gap-1 hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer" title="Text Color">
          <Palette className="w-4 h-4 text-slate-600" />
          <input
            type="color"
            onChange={handleColorChange}
            className="w-4 h-4 border-0 p-0 bg-transparent cursor-pointer outline-none"
            defaultValue="#000000"
          />
        </div>

        <div className="relative flex items-center gap-1 hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer" title="Highlight Color">
          <span className="w-4 h-4 bg-yellow-200 border border-slate-300 rounded flex items-center justify-center text-[10px] font-bold text-slate-700">A</span>
          <input
            type="color"
            onChange={handleBgColorChange}
            className="w-4 h-4 border-0 p-0 bg-transparent cursor-pointer outline-none"
            defaultValue="#FFFF00"
          />
        </div>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={handleLink}
          title="Insert Link"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Link className="w-4 h-4" />
        </button>

        {/* Clear formatting */}
        <button
          type="button"
          onClick={() => executeCommand("removeFormat")}
          title="Clear Formatting"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-red-500 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="custom-editor-editable w-full min-h-[400px] max-h-[600px] overflow-y-auto px-5 py-5 bg-slate-50/30 text-slate-800 outline-none transition-all font-medium text-sm leading-relaxed focus:bg-white"
        placeholder={placeholder}
        style={{
          minHeight: "400px",
          fontFamily: "Inter, sans-serif"
        }}
      />
    </div>
  );
};
