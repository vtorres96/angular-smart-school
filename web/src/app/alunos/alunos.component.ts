import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunoSelecionado: Aluno;
  public alunoForm: FormGroup;
  public modalRef: BsModalRef;
  public textoSimples: string;
  public titulo = 'Alunos';

  public alunos = [
    {id: 1, nome: 'Joao 1', sobrenome: 'Sobrenome 1', telefone: '1191233-2919'},
    {id: 2, nome: 'Joao 2', sobrenome: 'Sobrenome 2', telefone: '1193453-2919'},
    {id: 3, nome: 'Joao 3', sobrenome: 'Sobrenome 3', telefone: '1194563-2919'},
    {id: 4, nome: 'Joao 4', sobrenome: 'Sobrenome 4', telefone: '1199213-2919'},
    {id: 5, nome: 'Joao 5', sobrenome: 'Sobrenome 5', telefone: '1199123-2919'},
    {id: 6, nome: 'Joao 6', sobrenome: 'Sobrenome 6', telefone: '1198276-2919'}
  ];

  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit() {
    console.log(this.alunoForm.value)
  }

  alunoSelect(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar(){
    this.alunoSelecionado = null;
  }
}
