import React from 'react'
//import { TextStyleKit } from '@tiptap/extension-text-style'
import '@/styles/styles.scss'
import type { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  CodeXml,
  MessageSquareQuote,
} from "lucide-react";
import { /* EditorContent, useEditor,  useEditorState */ } from '@tiptap/react'
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toggle } from "@/components/ui/toggle"

export default function TipTapBar({ editor }: { editor: Editor | null }) {

    if (!editor) {
        return null;
    }
    
   /*  const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    }) */

    //
    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            preesed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            preesed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            preesed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            preesed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            preesed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            preesed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            preesed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            preesed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            preesed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            preesed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            preesed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            preesed: editor.isActive("highlight"),
        },
        {
            icon: <CodeXml className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            preesed: editor.isActive("codeBlock"),
        },
        {
            icon: <MessageSquareQuote className="size-4" />,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            preesed: editor.isActive("blockquote"),
        },
    ];

    return (
        <div className="border rounded-md p-1 mb-1  space-x-2 z-50 border-black ">
            {Options.map((option, index) => (
                <Toggle
                key={index}
                pressed={option.preesed}
                onPressedChange={option.onClick}
                >
                {option.icon}
                </Toggle>
            ))}
        </div>
        
    )
}


{/* <ToggleGroup type="single">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
                <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                className={editorState.isBold ? 'is-active' : ''}
                >
                Bold
                </button>
                <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                className={editorState.isItalic ? 'is-active' : ''}
                >
                Italic
                </button>
                <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                className={editorState.isStrike ? 'is-active' : ''}
                >
                Strike
                </button>
                <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
                className={editorState.isCode ? 'is-active' : ''}
                >
                Code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>
                <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editorState.isParagraph ? 'is-active' : ''}
                >
                Paragraph
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editorState.isHeading1 ? 'is-active' : ''}
                >
                H1
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editorState.isHeading2 ? 'is-active' : ''}
                >
                H2
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editorState.isHeading3 ? 'is-active' : ''}
                >
                H3
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editorState.isHeading4 ? 'is-active' : ''}
                >
                H4
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editorState.isHeading5 ? 'is-active' : ''}
                >
                H5
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editorState.isHeading6 ? 'is-active' : ''}
                >
                H6
                </button>
                <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editorState.isBulletList ? 'is-active' : ''}
                >
                Bullet list
                </button>
                <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editorState.isOrderedList ? 'is-active' : ''}
                >
                Ordered list
                </button>
                <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editorState.isCodeBlock ? 'is-active' : ''}
                >
                Code block
                </button>
                <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editorState.isBlockquote ? 'is-active' : ''}
                >
                Blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
                Undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
                Redo
                </button>
        </ToggleGroup> */}