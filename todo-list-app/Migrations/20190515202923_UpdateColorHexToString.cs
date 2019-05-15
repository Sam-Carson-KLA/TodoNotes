using Microsoft.EntityFrameworkCore.Migrations;

namespace todo_list_app.Migrations
{
    public partial class UpdateColorHexToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ColorHex",
                table: "ListItems",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ColorHex",
                table: "ListItems",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
