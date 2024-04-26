var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddCors();
    builder.Services.AddEndpointsApiExplorer(); // Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    app.UseCors(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseHttpsRedirection();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapControllers();
    app.Run();
}