import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    /* noop */
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">Terjadi kesalahan saat memuat halaman</h1>
            <p className="text-sm text-gray-500 mb-4">Coba muat ulang halaman. Jika masih terjadi, tutup tab lain yang membuka situs ini.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

