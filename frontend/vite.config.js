import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{ //serve para diminuir as entradas de url no código
    "/api":{ //sempre que este caminho for acessado, o programa insere o localhost na frente
      target: "http://localhost:5000"
      }
    }
  }
})
