using Microsoft.EntityFrameworkCore.Migrations;

namespace todo_list_app.Migrations
{
    public partial class AddColorHexColumn1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ColorHex",
                table: "ListItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorHex",
                table: "ListItems");
        }
    }
}
