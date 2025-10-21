import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ Configuração para o Vite aceitar conexões do backend no Replit
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      // ⬇️ Cole aqui o domínio do backend Replit (sem https://)
      '47d56afe-52b7-47be-9395-1cfd24b5c6ab-00-o0rjk7qcsia8.picard.replit.dev'
    ]
  }
})
