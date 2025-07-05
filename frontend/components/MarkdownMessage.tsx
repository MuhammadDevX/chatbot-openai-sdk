"use client";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  role: "user" | "assistant";
}

export default function MarkdownMessage({ content, role }: MarkdownMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-4 rounded-lg max-w-[80%] ${isUser
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-900'
        }`}>
        {isUser ? (
          // User messages - plain text
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          // Assistant messages - markdown
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom styling for code blocks
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;

                return isInline ? (
                  <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              // Custom styling for links
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {children}
                  </a>
                );
              },
              // Custom styling for lists
              ul({ children }) {
                return <ul className="list-disc list-inside space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal list-inside space-y-1">{children}</ol>;
              },
              // Custom styling for blockquotes
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    {children}
                  </blockquote>
                );
              },
              // Custom styling for tables
              table({ children }) {
                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-gray-300 px-4 py-2">
                    {children}
                  </td>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
} 