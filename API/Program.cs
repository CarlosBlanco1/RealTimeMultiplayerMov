using System.Net.WebSockets;
using System.Text;
 
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
 
var app = builder.Build();
app.UseCors( p =>
    p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
);
 
app.UseWebSockets();
app.MapGet("/websocket", () => "Hello World!");
 
List<WebSocket> WebSockets = new();
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws")
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            WebSockets.Add(webSocket);
            Console.WriteLine("Connection created. ");
            await Echo(webSocket);
            WebSockets.Remove(webSocket);
            Console.WriteLine("Connection closed. ");
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
    else
    {
        await next(context);
    }
 
});
 
app.Run();
 
async Task Echo(WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    // wsl.Add(webSocket);
    // foreach (var socket in wsl)
    // {
        var receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);
        Console.WriteLine(receiveResult);
    // }
 
    while (!receiveResult.CloseStatus.HasValue)
    {
        string bufferAsString = Encoding.ASCII.GetString(buffer);
        Console.WriteLine(bufferAsString);
 
        foreach (var ws in WebSockets)
        {
            if (ws.State == WebSocketState.Closed)
                continue;
            await ws.SendAsync(
                new ArraySegment<byte>(buffer, 0, receiveResult.Count),
                receiveResult.MessageType,
                receiveResult.EndOfMessage,
                CancellationToken.None);
        }
 
        receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);
    }
 
    await webSocket.CloseAsync(
        receiveResult.CloseStatus.Value,
        receiveResult.CloseStatusDescription,
        CancellationToken.None);
}