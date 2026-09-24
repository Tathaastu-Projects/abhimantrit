type Badge = { id: string; label: string; description?: string };

export function TrustBar({ badges }: { badges: Badge[] }) {
  return (
    <div className="border-b border-[var(--border)] bg-mist">
      <div className="container-pad grid grid-cols-2 gap-3 py-3 md:grid-cols-4">
        {badges.slice(0, 4).map((b) => (
          <div key={b.id} className="flex items-center gap-2 text-sm text-ink-soft">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-medium text-ink">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
