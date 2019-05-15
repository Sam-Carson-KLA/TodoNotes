using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todo_list_app.Models;

namespace todo_list_app.Controllers
{
    [Route("api/todo-list")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly NoteContext _context;

        public ListController(NoteContext context)
        {
            _context = context;

            if (_context.ListItems.Count() == 0)
            {
                // Create a new ListItem if collection is empty,
                // which means you can't delete all ListItems
                _context.ListItems.Add(new List { Name = "Example Note" });
                _context.SaveChanges();
            }
        }

        // GET: api/Todo-list
        [HttpGet]
        public async Task<ActionResult<IEnumerable<List>>> GetLists()
        {
            return await _context.ListItems.ToListAsync();
        }

        // GET: api/Todo-list/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List>> GetList(long id)
        {
            var list = await _context.ListItems.FindAsync(id);

            if (list == null)
            {
                return NotFound();
            }

            return list;
        }

        // POST: api/Todo-list
        [HttpPost]
        public async Task<ActionResult<List>> PostList(List list)
        {

            _context.ListItems.Add(list);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetList), new { id = list.Id }, list);
        }

        // PUT: api/Todo-list/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListItem(long id, List item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Todo-list/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList(long id)
        {
            var list = await _context.ListItems.FindAsync(id);

            if (list == null)
            {
                return NotFound();
            }

            _context.ListItems.Remove(list);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
