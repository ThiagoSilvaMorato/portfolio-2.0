import { Bot, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/common/section";
import { useCurrentLocale } from "@/i18n";
import { cn } from "@/lib/utils";
import { RESPONSE_DELAY_MS } from "./constants/chat";

type Message = {
  id: string;
  author: "user" | "ai";
  text: string;
};

export function Chat() {
  const { t } = useTranslation();
  const locale = useCurrentLocale();
  const pageTitle = `Thiago Morato | ${t("chat.title")}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={t("chat.description")} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={t("chat.description")} />
      </Helmet>

      <Section eyebrow={t("chat.eyebrow")} title={t("chat.title")}>
        {/* key força remontar a conversa (com nova saudação) quando o idioma muda. */}
        <ChatWindow key={locale} />
      </Section>
    </>
  );
}

function ChatWindow() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { id: crypto.randomUUID(), author: "ai", text: t("chat.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const send = (text: string) => {
    const question = text.trim();
    if (!question || isTyping) return;

    setMessages((current) => [...current, { id: crypto.randomUUID(), author: "user", text: question }]);
    setInput("");
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), author: "ai", text: t("chat.maintenance") },
      ]);
    }, RESPONSE_DELAY_MS);
  };

  const suggestions = t("chat.suggestions", { returnObjects: true });

  return (
    <div className='glass-panel neon-border mx-auto flex h-140 max-w-3xl flex-col overflow-hidden rounded-2xl'>
      <div className='flex items-center gap-3 border-b border-border/60 px-5 py-4'>
        <span className='grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary'>
          <Bot className='h-5 w-5' />
        </span>
        <div>
          <p className='font-title text-sm tracking-widest text-foreground uppercase'>
            {t("chat.assistant")}
          </p>
          <p className='inline-flex items-center gap-1.5 text-xs text-muted-foreground'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-accent' /> {t("chat.status")}
          </p>
        </div>
      </div>

      <div className='flex-1 space-y-4 overflow-y-auto px-5 py-6'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex items-end gap-2", message.author === "user" && "flex-row-reverse")}
          >
            <span
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center rounded-full",
                message.author === "ai" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent",
              )}
            >
              {message.author === "ai" ? (
                <Bot className='h-4 w-4' />
              ) : (
                <User className='h-4 w-4' />
              )}
            </span>
            <p
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                message.author === "ai"
                  ? "rounded-bl-sm bg-secondary text-foreground"
                  : "rounded-br-sm bg-primary text-primary-foreground",
              )}
            >
              {message.text}
            </p>
          </div>
        ))}

        {isTyping && (
          <div className='flex items-end gap-2'>
            <span className='grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary'>
              <Bot className='h-4 w-4' />
            </span>
            <p className='rounded-2xl rounded-bl-sm bg-secondary px-4 py-3 text-sm text-muted-foreground'>
              <span className='inline-flex gap-1'>
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]' />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]' />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]' />
              </span>
            </p>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className='flex flex-wrap gap-2 px-5 pb-3'>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type='button'
            onClick={() => send(suggestion)}
            className='inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary'
          >
            <Sparkles className='h-3 w-3' /> {suggestion}
          </button>
        ))}
      </div>

      <form
        className='flex items-center gap-2 border-t border-border/60 px-4 py-3'
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("chat.placeholder")}
          className='flex-1 rounded-xl bg-secondary px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary'
        />
        <button
          type='submit'
          aria-label={t("chat.send")}
          className='grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105'
        >
          <Send className='h-4 w-4' />
        </button>
      </form>
    </div>
  );
}
