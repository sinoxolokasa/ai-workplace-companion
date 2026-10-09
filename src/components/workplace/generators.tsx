import { useState, useEffect, useRef } from "react";
import {
  Mail,
  ScanText,
  Copy,
  Check,
  Download,
  RotateCcw,
  ArrowRight,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageResponse } from "@/components/ai-elements/message";
import { WorkplaceShell, PageHeading, SimulationNotice } from "./shell";
import { generateEmail, researchText, type Tone } from "@/lib/simulations";

function OutputActions({ output }: { output: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex gap-1">
      <Button
        title="Copy output"
        aria-label="Copy output"
        size="icon-sm"
        variant="ghost"
        disabled={!output}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
      <Button
        title="Download output"
        aria-label="Download output"
        size="icon-sm"
        variant="ghost"
        disabled={!output}
        onClick={() => {
          const url = URL.createObjectURL(new Blob([output], { type: "text/plain" }));
          const a = document.createElement("a");
          a.href = url;
          a.download = "workplace-output.txt";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        <Download />
      </Button>
    </div>
  );
}
function OutputPanel({
  output,
  busy,
  email = false,
}: {
  output: string;
  busy: boolean;
  email?: boolean;
}) {
  return (
    <section className="panel flex min-h-[460px] flex-col">
      <div className="panel-title justify-between">
        <span className="flex items-center gap-2">
          <FileText size={17} className="text-muted-foreground" />
          {email ? "Generated email" : "Research output"}
        </span>
        <OutputActions output={output} />
      </div>
      <div className="flex flex-1 flex-col p-6" aria-live="polite">
        {busy ? (
          <div className="flex flex-1 items-center justify-center gap-2 text-muted-foreground">
            <LoaderCircle className="size-5 animate-spin" />
            Preparing your simulated response…
          </div>
        ) : output ? (
          <div className="animate-enter">
            {email ? (
              <p className="whitespace-pre-wrap text-sm leading-7">{output}</p>
            ) : (
              <MessageResponse>{output}</MessageResponse>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-secondary">
              <FileText size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">A clear starting point</h3>
            <p className="mt-2 max-w-56 text-xs leading-6 text-muted-foreground">
              {email
                ? "Your email draft will appear here."
                : "Your summary and recommendations will appear here."}
            </p>
          </div>
        )}
        <div className="mt-auto pt-6 text-[10px] text-muted-foreground">
          SIMULATED OUTPUT · REVIEW BEFORE USE
        </div>
      </div>
    </section>
  );
}
export function EmailGenerator({ example = false }: { example?: boolean }) {
  const [recipient, setRecipient] = useState(example ? "Project team" : "");
  const [subject, setSubject] = useState(example ? "Project follow-up" : "");
  const [details, setDetails] = useState(
    example
      ? "Please share your progress on the current milestones by Friday. Let me know if there are any blockers and how I can help."
      : "",
  );
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <WorkplaceShell title="Email Generator">
      <PageHeading
        title="Smart Email Generator"
        description="From a few thoughts to a well-written email. Find the tone that fits."
      />
      <div className="grid items-stretch gap-6 xl:grid-cols-2">
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (!details.trim() || !subject.trim()) return;
            setBusy(true);
            timer.current = setTimeout(() => {
              setOutput(generateEmail(recipient, subject, details, tone));
              setBusy(false);
            }, 850);
          }}
        >
          <div className="panel-title">
            <Mail size={18} className="text-primary" />
            Your email details
          </div>
          <div className="space-y-5 p-6">
            <label className="block space-y-2">
              <span className="text-xs font-medium">
                Recipient <span className="font-normal text-muted-foreground">(optional)</span>
              </span>
              <input
                className="field"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Project team"
                maxLength={120}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-medium">Subject or purpose</span>
              <input
                required
                className="field"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Follow up on a project update"
                maxLength={200}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-medium">What would you like to say?</span>
              <textarea
                required
                className="field min-h-36 resize-y"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Add your key points, context, and next steps…"
                maxLength={6000}
              />
            </label>
            <fieldset>
              <legend className="mb-3 text-xs font-medium">Choose your tone</legend>
              <div className="grid grid-cols-3 gap-2">
                {(["Formal", "Friendly", "Persuasive"] as Tone[]).map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={tone === t ? "default" : "outline"}
                    aria-pressed={tone === t}
                    onClick={() => setTone(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </fieldset>
            <div className="flex items-center gap-3 pt-1">
              <Button
                type="submit"
                disabled={busy || !subject.trim() || !details.trim()}
                className="flex-1"
              >
                {busy ? <LoaderCircle className="animate-spin" /> : <Mail />}
                {busy ? "Generating…" : "Generate email"}
                <ArrowRight />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Clear email"
                aria-label="Clear email"
                disabled={busy}
                onClick={() => {
                  setSubject("");
                  setRecipient("");
                  setDetails("");
                  setOutput("");
                }}
              >
                <RotateCcw />
              </Button>
            </div>
          </div>
        </form>
        <OutputPanel output={output} busy={busy} email />
      </div>
      <SimulationNotice />
    </WorkplaceShell>
  );
}
export function ResearchAssistant({ example = false }: { example?: boolean }) {
  const [mode, setMode] = useState<"text" | "topic">(example ? "topic" : "text");
  const [input, setInput] = useState(example ? "Remote team collaboration" : "");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <WorkplaceShell title="Research Assistant">
      <PageHeading
        title="AI Research Assistant"
        description="Get to the heart of a document or explore a topic with a fresh perspective."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            setBusy(true);
            timer.current = setTimeout(() => {
              setOutput(researchText(input, mode));
              setBusy(false);
            }, 1000);
          }}
        >
          <div className="panel-title">
            <ScanText size={18} className="text-violet" />
            Your research brief
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={mode === "text" ? "default" : "outline"}
                onClick={() => {
                  setMode("text");
                  setOutput("");
                }}
                aria-pressed={mode === "text"}
              >
                Summarise text
              </Button>
              <Button
                type="button"
                variant={mode === "topic" ? "default" : "outline"}
                onClick={() => {
                  setMode("topic");
                  setOutput("");
                }}
                aria-pressed={mode === "topic"}
              >
                Explore a topic
              </Button>
            </div>
            <label className="block space-y-3">
              <span className="text-xs font-medium">
                {mode === "text" ? "Text to summarise" : "Topic to explore"}
              </span>
              <textarea
                required
                className="field min-h-64 resize-y"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={15000}
                placeholder={
                  mode === "text"
                    ? "Paste an article, meeting notes, or a document excerpt…"
                    : "e.g. Improving collaboration in a remote team"
                }
              />
              <span className="block text-right text-[10px] text-muted-foreground">
                {input.length.toLocaleString()} / 15,000 characters
              </span>
            </label>
            <div className="flex gap-3">
              <Button disabled={busy || !input.trim()} className="flex-1" type="submit">
                {busy ? <LoaderCircle className="animate-spin" /> : <ScanText />}
                {busy ? "Preparing…" : mode === "text" ? "Summarise text" : "Explore topic"}
                <ArrowRight />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                title="Clear research"
                aria-label="Clear research"
                disabled={busy}
                onClick={() => {
                  setInput("");
                  setOutput("");
                }}
              >
                <RotateCcw />
              </Button>
            </div>
          </div>
        </form>
        <OutputPanel output={output} busy={busy} />
      </div>
      <SimulationNotice />
    </WorkplaceShell>
  );
}
