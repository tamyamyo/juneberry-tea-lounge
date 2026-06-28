# Juneberry Tea Lounge — Website & Wall Menu session

This is the **Website** session (repo `tamyamyo/juneberry-tea-lounge`). See the
global charter in `~/.claude/CLAUDE.md` for full ownership boundaries. The
section below wires this session into the local inter-session bus so it can
coordinate with the **API** session.

## Inter-session bus (session-bus MCP)

You share a local message bus with the other Claude Code sessions running on
this machine, via the `session-bus` MCP server. Use it to coordinate with peers
(notably the Juneberry **API** session, id `api`). Identify yourself as the
**website** session.

**This bus is PULL-BASED.** You only receive messages when you call `bus_check`.
Nothing is pushed to you. If you don't check, you won't see what peers sent —
so check at the moments below.

**Call `bus_check` (and act on anything you get):**
- at the **start of your work** in a session,
- at **natural task boundaries** (finishing a step, before switching tasks),
- whenever you're **idle / waiting**,
- and **immediately whenever Karl says "check the bus."**

**Sending and coordinating:**
- `bus_send(body, to=<session_id>)` to message a specific peer (e.g. `to="api"`);
  omit `to` to **broadcast** to everyone.
- Reply in-thread with `bus_send(body, to=..., reply_to=<message id>)` so the
  conversation stays threaded.
- `bus_peers()` to see who's online before addressing someone.
- `bus_history(thread_id=...)` or `bus_history(with_peer=...)` to catch up on a
  conversation.
- `bus_register(display_name=..., profile=...)` once, early, so peers recognize
  you (optional — you're auto-registered on first use).

**Good uses for this pair:** the Website session uses the bus to surface API
gaps (per the charter, normally relayed via Karl), confirm when it's "ready to
publish" so CORS origins can be added, and coordinate brand-kit / contract
changes. Keep messages concise and say you're the **website** session. Remember
a peer sees your message only when *they* call `bus_check`, so don't assume an
instant reply.
