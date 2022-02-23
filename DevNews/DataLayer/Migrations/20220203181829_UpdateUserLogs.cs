using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    public partial class UpdateUserLogs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VisitArticles_Article_ArticleId",
                table: "VisitArticles");

            migrationBuilder.DropForeignKey(
                name: "FK_VisitArticles_User_UserId",
                table: "VisitArticles");

            migrationBuilder.DropIndex(
                name: "IX_VisitArticles_ArticleId",
                table: "VisitArticles");

            migrationBuilder.DropIndex(
                name: "IX_VisitArticles_UserId",
                table: "VisitArticles");

            migrationBuilder.CreateTable(
                name: "Explore",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ArticleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Explore", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Explore");

            migrationBuilder.CreateIndex(
                name: "IX_VisitArticles_ArticleId",
                table: "VisitArticles",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitArticles_UserId",
                table: "VisitArticles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VisitArticles_Article_ArticleId",
                table: "VisitArticles",
                column: "ArticleId",
                principalTable: "Article",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VisitArticles_User_UserId",
                table: "VisitArticles",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
