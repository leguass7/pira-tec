import React from 'react'
import {Products, Developers, Company} from '../Content'
import { DropdownProvider, DropdownOpction } from '../Dropdown'
import { Container, DropdownStyles } from './styles'

function Navbar() {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
                <DropdownOpction
                  name= "Produtos"
                  content= {Products}
                />
            </li>
            <li>
                <DropdownOpction
                  name= "Serviços"
                  content= {Developers}
                />
            </li>
            <li>
                <DropdownOpction
                  name= "Empresa"
                  content= {Company}
                />
            </li>
          </ul>
        </Container>
      </DropdownStyles>
    </DropdownProvider>
  )
}

export default Navbar