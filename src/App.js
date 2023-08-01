import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'

import Container from './layout/Container'
import NavBar from './layout/NavBar'
import Head from './layout/Head'
import Login from './pages/Login'
import Home from './pages/Home'
import Cadastrar from './pages/Cadastrar'
import Editar from './pages/Editar'
import Dashboard from './pages/Dashboard'
import Promocoes from './pages/Promocoes'
import CadastrarPromocoes from './pages/CadastrarPromocoes'
import CadastrarImagemPromocao from './pages/CadastrarImagemPromocao'
import Cupons from './pages/Cupons'
import RedefinirSenha from './pages/RedefinirSenha'
import AlterarSenha from './pages/AlterarSenha'
import Gestor from './pages/Gestor'
import RecuperacaoSenha from './pages/RecuperacaoSenha'
import Footer from './layout/Footer'

export default function App() {

  const pathname = useSelector((state) => state.location.path)
  
  return(
    <Router>
      {(pathname === '/') && <Head />}
      {(pathname !== '/') && <NavBar />}
      <Container customClass='min_height'>
        <Routes>
          <Route path="/" 
            element={<Login />}>
          </Route>
          <Route path="/home" 
            element={<Home />}>
          </Route>
          <Route path="/dashboard" 
            element={<Dashboard />}>
          </Route>
          <Route path="/cadastrarproduto" 
            element={<Cadastrar />}>
          </Route>
          <Route path="/editarproduto" 
            element={<Editar />}>
          </Route>
          <Route path="/promocoes" 
            element={<Promocoes />}>
          </Route>
          <Route path="/cupons" 
            element={<Cupons />}>
          </Route>
          <Route path="/redefinirsenha" 
            element={<RedefinirSenha />}>
          </Route>
          <Route path="/gestor" 
            element={<Gestor />}>
          </Route>
          <Route path="/cadastrarpromocoes" 
            element={<CadastrarPromocoes />}>
          </Route>
          <Route path="/cadastrarimagempromocao" 
            element={<CadastrarImagemPromocao />}>
          </Route>
          <Route path="/alterarsenha" 
            element={<AlterarSenha />}>
          </Route>
          <Route path="/recuperacaosenha" 
            element={<RecuperacaoSenha />}>
          </Route>
        </Routes>
        <Footer />
      </Container>
    </Router>
  )
}