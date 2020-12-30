import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';
import { AlunoService } from './aluno.service';

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
  public alunos: Aluno[];
  public mensagem: object;
  public titulo = 'Alunos';
  public metodo = 'post';

  constructor(
    private fb: FormBuilder, 
    private modalService: BsModalService,
    private alunoService: AlunoService
  ) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => { 
        this.alunos = alunos 
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit() {
    this.salvarAluno(this.alunoForm.value);
  }

  salvarAluno(aluno: Aluno){
    aluno.id === 0 ? this.metodo = 'post' : this.metodo = 'put';

    this.alunoService[this.metodo](aluno).subscribe(
      () => {
        this.carregarAlunos();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  alunoSelect(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo(){
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  deletar(id: number, ){
    this.alunoService.delete(id).subscribe(
      (retorno) => {
        this.mensagem = retorno;
        this.carregarAlunos();
      },
      (erro: any) => {
        console.log(erro);
      }
    );

    this.modalRef.hide();

    setTimeout(function(){
      let mensagemDeSucesso = document.querySelector('.alert-success')
      if(mensagemDeSucesso){
          mensagemDeSucesso.remove()
      }
    }, 2000)
  }

  voltar(){
    this.alunoSelecionado = null;
  }
}
