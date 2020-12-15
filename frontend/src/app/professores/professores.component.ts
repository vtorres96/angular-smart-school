import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/professor';

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
  public titulo = 'Professores';

  public professores = [
    {id: 1, nome: 'Prof Joao 1', sobrenome: 'Sobrenome 1', disciplina: 'Data Science'},
    {id: 2, nome: 'Prof Joao 2', sobrenome: 'Sobrenome 2', disciplina: 'Desenvolvimento Mobile'},
    {id: 3, nome: 'Prof Joao 3', sobrenome: 'Sobrenome 3', disciplina: 'UX'},
    {id: 4, nome: 'Prof Joao 4', sobrenome: 'Sobrenome 4', disciplina: 'Desenvolvimento Web'},
    {id: 5, nome: 'Prof Joao 5', sobrenome: 'Sobrenome 5', disciplina: 'Data Analytics'},
    {id: 6, nome: 'Prof Joao 6', sobrenome: 'Sobrenome 6', disciplina: 'Marketing Digital'}
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
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }

  professorSubmit() {
    console.log(this.professorForm.value);
  }
  
  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar(){
    this.professorSelecionado = null;
  }
}
