import { LayoutDashboard, Moon, Plus, Search, Sun } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/button';

export const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card px-4 py-5 md:block">
        <div className="flex items-center gap-2 px-2 text-lg font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          IssueFlow
        </div>
        <nav className="mt-8 space-y-1">
          <NavLink to="/issues" className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-muted ${isActive ? 'bg-muted font-medium' : 'text-muted-foreground'}`}>
            <Search className="h-4 w-4" />
            Issues
          </NavLink>
          <NavLink to="/issues/new" className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-muted ${isActive ? 'bg-muted font-medium' : 'text-muted-foreground'}`}>
            <Plus className="h-4 w-4" />
            New issue
          </NavLink>
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur md:px-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Issue management</p>
            <h1 className="text-lg font-semibold">Workspace dashboard</h1>
          </div>
          <Button aria-label="Toggle theme" onClick={toggleTheme} variant="secondary" size="sm">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
