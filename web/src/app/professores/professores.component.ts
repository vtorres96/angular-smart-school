import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/professor';
import { ProfessorService } from "./professor.service";

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public professorSelecionado: Professor;
  public professorForm: FormGroup;
  public modalRef: BsModalRef;
  public textoSimples: string;
  public professores: Professor[];
  public mensagem: object;
  public titulo = 'Professores';
  public metodo = 'post';

  constructor(
    private fb: FormBuilder, 
    private modalService: BsModalService,
    private professorService: ProfessorService
  ) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarProfessores();
  }

  carregarProfessores(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => { 
        this.professores = professores 
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
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required]
    });
  }

  professorSubmit() {
    this.salvarProfessor(this.professorForm.value);
  }

  salvarProfessor(professor: Professor){
    professor.id === 0 ? this.metodo = 'post' : this.metodo = 'put';

    this.professorService[this.metodo](professor).subscribe(
      () => {
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }
  
  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorNovo(){
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

  deletar(id: number, ){
    this.professorService.delete(id).subscribe(
      (retorno) => {
        this.mensagem = retorno;
        this.carregarProfessores();
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
    this.professorSelecionado = null;
  }
}
