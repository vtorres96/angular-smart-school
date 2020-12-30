using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repo;

        public ProfessorController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllProfessoresAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{professorId}")]
        public async Task<IActionResult> GetProfessorById(int professorId)
        {
            try
            {
                var result = await _repo.GetProfessorAsyncById(professorId, true);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("aluno/{alunoId}")]
        public async Task<IActionResult> GetProfessorByAlunoId(int alunoId)
        {
            try
            {
                var result = await _repo.GetProfessoresAsyncByAlunoId(alunoId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Professor model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{professorId}")]
        public async Task<IActionResult> Put(int professorId, Professor model)
        {
            try
            {
                var Professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(Professor == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{professorId}")]
        public async Task<IActionResult> Delete(int professorId)
        {
            try
            {
                var Professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(Professor == null) return NotFound();

                _repo.Delete(Professor);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok(new { message = "Professor excluído com sucesso" });
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}