﻿namespace todo_list_app.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public long ListId { get; set; }
    }
}
