import { useState, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import { ArrowUp, RotateCcw, Sparkles } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { WorkplaceShell, PageHeading, SimulationNotice, BrandMark, AiGeneratedBadge } from "./shell";
import { chatReply } from "@/lib/simulations";
export function WorkplaceChat({ example = false }: { example?: boolean }) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState(example ? "Help me plan a more productive workday" : "");
  const [busy, setBusy] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counter = useRef(0);
  useEffect(() => {
    textarea.current?.focus();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  function send(text: string) {
    if (!text.trim() || busy) return;
    const previous = messages
      .filter((m) => m.role === "user")
      .at(-1)
      ?.parts.find((p) => p.type === "text");
    const previousPrompt = previous?.type === "text" ? previous.text : undefined;
    const user: UIMessage = {
      id: `local-${++counter.current}`,
      role: "user",
      parts: [{ type: "text", text: text.trim() }],
    };
    setMessages((m) => [...m, user]);
    setInput("");
    setBusy(true);
    textarea.current?.focus();
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `local-${++counter.current}`,
          role: "assistant",
          parts: [{ type: "text", text: chatReply(text, previousPrompt) }],
        },
      ]);
      setBusy(false);
      textarea.current?.focus();
    }, 1000);
  }
  return (
    <WorkplaceShell title="AI Chatbot">
      <PageHeading
        title="Your workplace thinking partner"
        description="Work through an idea, plan your day, or find a better way forward."
      />
      <section className="panel chat-height">
        <div className="panel-title justify-between">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <div className="text-sm">Workplace Assistant</div>
              <div className="mt-1 text-[10px] font-normal text-muted-foreground">
                Simulated conversation · This session only
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AiGeneratedBadge className="hidden sm:inline-flex" />
            <Button
              size="icon"
              variant="ghost"
              title="Clear conversation"
              aria-label="Clear conversation"
              disabled={busy || messages.length === 0}
              onClick={() => {
                setMessages([]);
                textarea.current?.focus();
              }}
            >
              <RotateCcw />
            </Button>
          </div>
        </div>
        <Conversation>
          <ConversationContent className="p-6">
            {messages.length === 0 ? (
              <div className="flex min-h-56 flex-col items-center justify-center text-center">
                <BrandMark />
                <h2 className="mt-5 text-xl font-semibold">What's on your workday?</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  A clear plan. A fresh idea. Your next step.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    "Plan my workday",
                    "Prepare a meeting agenda",
                    "Give constructive feedback",
                  ].map((p) => (
                    <Button key={p} variant="outline" size="sm" onClick={() => send(p)}>
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    {m.parts.map((p, i) =>
                      p.type === "text" ? (
                        <MessageResponse key={i} className="chat-response">
                          {p.text}
                        </MessageResponse>
                      ) : null,
                    )}
                    {m.role === "assistant" && (
                      <span className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Sparkles size={10} aria-hidden="true" />
                        AI-generated · review before use
                      </span>
                    )}
                  </MessageContent>
                </Message>
              ))
            )}
            {busy && <Shimmer>Thinking…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <div className="border-t border-border p-4">
          <PromptInput onSubmit={({ text }) => send(text)}>
            <PromptInputTextarea
              ref={textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind at work?"
              aria-label="Message workplace assistant"
              maxLength={3000}
            />
            <PromptInputFooter className="justify-between">
              <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <AiGeneratedBadge />
                This session only
              </span>
              <PromptInputSubmit
                status={busy ? "submitted" : "ready"}
                disabled={busy || !input.trim()}
                aria-label="Send message"
              >
                {!busy && <ArrowUp />}
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </section>
      <SimulationNotice />
    </WorkplaceShell>
  );
}
