'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapBar from '@/components/TipTapBar'
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Tiptap({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            },
            orderedList: {
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            },
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
        Highlight,
    ],
    content: content,
    editorProps: {
        attributes: {
            class: 'min-h-[30vh] font-normal border border-black rounded-md p-4 focus:ring-transparent focus:outline-none',
        },
    },
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return (
    <div>
        <TipTapBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}