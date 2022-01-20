using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    public partial class FileUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Channel");

            migrationBuilder.AddColumn<Guid>(
                name: "ObjectId",
                table: "File",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ObjectId",
                table: "File");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Channel",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
