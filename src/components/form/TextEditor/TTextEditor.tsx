"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

import Toolbar from "./Toolbar";
const TTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      ListItem,
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "rounded-b-lg bg-white p-4 outline-none min-h-[200px] border border-t-0 border-[#EAECF0]",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  return (
    <div>
      <label className="mb-2 block text-shark-800" htmlFor="desc">
        Post Description
      </label>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TTextEditor;
