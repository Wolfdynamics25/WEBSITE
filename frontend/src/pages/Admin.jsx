import { useEffect, useState, useCallback } from "react";
import AppShell from "@/components/app/AppShell";
import api, { formatApiErrorDetail } from "@/lib/api";
import { CheckCircle2, Mail, RefreshCw, UserCheck, UserX } from "lucide-react";

const roleColor = {
  admin: "text-amber-warn",
  investor: "text-od-green",
  partner: "text-od-green",
  team: "text-tac-100",
  pending: "text-signal-red",
};

const Admin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("inquiries");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const [inq, usr] = await Promise.all([api.get("/contact"), api.get("/auth/users")]);
      setInquiries(inq.data);
      setUsers(usr.data);
    } catch (e) {
      setErr(formatApiErrorDetail(e.response?.data?.detail) || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id) => {
    try {
      await api.post(`/contact/${id}/read`);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
    } catch (e) {
      /* ignore */
    }
  };

  const approve = async (userId, role) => {
    try {
      const { data } = await api.post(`/auth/users/${userId}/approve`, { role });
      setUsers((prev) => prev.map((u) => (u.user_id === userId ? data : u)));
    } catch (e) {
      alert(formatApiErrorDetail(e.response?.data?.detail));
    }
  };

  const deactivate = async (userId) => {
    if (!window.confirm("Deactivate this user? They will lose access.")) return;
    try {
      const { data } = await api.post(`/auth/users/${userId}/deactivate`);
      setUsers((prev) => prev.map((u) => (u.user_id === userId ? data : u)));
    } catch (e) {
      alert(formatApiErrorDetail(e.response?.data?.detail));
    }
  };

  const unread = inquiries.filter((i) => !i.read).length;
  const pending = users.filter((u) => u.role === "pending").length;

  return (
    <AppShell
      subtitle="ADMIN · CONTROL PLANE"
      title={<>ADMIN <span className="text-amber-warn">CONSOLE.</span></>}
      actions={
        <button
          onClick={load}
          data-testid="admin-refresh"
          className="inline-flex items-center gap-2 px-4 py-2 border border-tac-100/20 hover:border-amber-warn hover:text-amber-warn font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors"
        >
          <RefreshCw size={12} strokeWidth={1.5} />
          <span>Refresh</span>
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="border border-tac-100/12 p-6 bg-tac-850">
          <div className="mono-label" style={{ color: "#E87722" }}>INQUIRIES · TOTAL</div>
          <div className="font-display text-3xl text-tac-100 mt-3">{inquiries.length}</div>
        </div>
        <div className="border border-tac-100/12 p-6 bg-tac-850">
          <div className="mono-label" style={{ color: "#E87722" }}>UNREAD</div>
          <div className="font-display text-3xl text-tac-100 mt-3">{unread}</div>
        </div>
        <div className="border border-tac-100/12 p-6 bg-tac-850">
          <div className="mono-label" style={{ color: "#E87722" }}>USERS · TOTAL</div>
          <div className="font-display text-3xl text-tac-100 mt-3">{users.length}</div>
        </div>
        <div className="border border-tac-100/12 p-6 bg-tac-850">
          <div className="mono-label" style={{ color: "#E87722" }}>PENDING APPROVAL</div>
          <div className="font-display text-3xl text-signal-red mt-3">{pending}</div>
        </div>
      </div>

      {err && (
        <div className="border border-signal-red/60 bg-signal-red/10 text-tac-100 px-4 py-3 mb-6 font-mono text-sm">
          {err}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-tac-100/12 mb-6">
        {["inquiries", "users"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            data-testid={`admin-tab-${t}`}
            className={`py-3 font-mono text-[11px] tracking-[0.24em] uppercase transition-colors ${
              tab === t ? "text-amber-warn border-b border-amber-warn -mb-px" : "text-tac-200 hover:text-tac-100"
            }`}
          >
            {t === "inquiries" ? `Inquiries · ${inquiries.length}` : `Users · ${users.length}`}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-tac-200 font-mono text-sm">Loading…</div>
      )}

      {/* Inquiries table */}
      {!loading && tab === "inquiries" && (
        <div data-testid="admin-inquiries-table" className="border border-tac-100/12 divide-y divide-tac-100/10 bg-tac-850">
          {inquiries.length === 0 && (
            <div className="p-8 text-center mono-label">No inquiries yet.</div>
          )}
          {inquiries.map((i) => (
            <div key={i.id} data-testid={`inquiry-row-${i.id}`} className={`p-6 ${!i.read ? "bg-amber-warn/5" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {!i.read && <span className="w-2 h-2 bg-amber-warn rounded-full" />}
                  <span className="font-display text-tac-100 text-xl">{i.name}</span>
                  <span className="mono-label">{i.interest.toUpperCase()}</span>
                  {i.organization && <span className="mono-label">· {i.organization}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10.5px] tracking-[0.15em] uppercase text-tac-300">
                    {new Date(i.created_at).toLocaleString()}
                  </span>
                  {!i.read && (
                    <button
                      onClick={() => markRead(i.id)}
                      data-testid={`inquiry-mark-read-${i.id}`}
                      className="inline-flex items-center gap-1 mono-label hover:text-amber-warn transition-colors"
                    >
                      <CheckCircle2 size={12} strokeWidth={1.5} />
                      <span>Mark read</span>
                    </button>
                  )}
                </div>
              </div>
              <a href={`mailto:${i.email}`} className="inline-flex items-center gap-2 font-mono text-[12px] text-amber-warn hover:underline mb-3">
                <Mail size={12} strokeWidth={1.5} /> {i.email}
              </a>
              <p className="text-tac-100 text-[15px] leading-[1.6] whitespace-pre-wrap">{i.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Users table */}
      {!loading && tab === "users" && (
        <div data-testid="admin-users-table" className="border border-tac-100/12 divide-y divide-tac-100/10 bg-tac-850">
          {users.length === 0 && (
            <div className="p-8 text-center mono-label">No users yet.</div>
          )}
          {users.map((u) => (
            <div key={u.user_id} data-testid={`user-row-${u.user_id}`} className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-display text-tac-100 text-xl">{u.name}</span>
                  <span className={`mono-label ${roleColor[u.role] || "text-tac-200"}`}>
                    {u.role.toUpperCase()}
                  </span>
                  {u.deactivated && <span className="mono-label text-signal-red">DEACTIVATED</span>}
                </div>
                <div className="mt-1 font-mono text-[12px] text-tac-200">{u.email}{u.organization ? ` · ${u.organization}` : ""}</div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {u.role === "pending" && (
                  <>
                    {["investor", "partner", "team"].map((r) => (
                      <button
                        key={r}
                        onClick={() => approve(u.user_id, r)}
                        data-testid={`approve-${u.user_id}-${r}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-od-green/60 text-od-green hover:bg-od-green/10 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors"
                      >
                        <UserCheck size={11} strokeWidth={1.5} />
                        <span>Approve · {r}</span>
                      </button>
                    ))}
                  </>
                )}
                {u.role !== "admin" && !u.deactivated && u.role !== "pending" && (
                  <button
                    onClick={() => deactivate(u.user_id)}
                    data-testid={`deactivate-${u.user_id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-signal-red/60 text-signal-red hover:bg-signal-red/10 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors"
                  >
                    <UserX size={11} strokeWidth={1.5} />
                    <span>Deactivate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
};

export default Admin;
