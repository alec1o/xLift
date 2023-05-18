using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Sisma;

public class MasterClient
{
    public readonly string rawJwt;
    private readonly JwtData jwtData;

    public bool isConnected { get; private set; }

    public MasterClient(string rawJwt, JwtData jwtData)
    {
        this.rawJwt = rawJwt;
        this.jwtData = jwtData;
    }

    public void Close()
    {

    }

    public void Send(byte[] message)
    {

    }

    public void Send(string message)
    {

    }

    public static JwtData? VerifyJwt(string rawJwt)
    {
        if (rawJwt == null) return null;

        var secret = "password-here";
        var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        var tokenParams = new TokenValidationParameters()
        {
            IssuerSigningKey = secretKey
        };

        try
        {
            var handle = new JwtSecurityTokenHandler();
            _ = handle.ValidateToken(rawJwt, tokenParams, out var validatedToken);

            string json = rawJwt.Split('.')[2];

            return JsonSerializer.Deserialize<JwtData>(json);
        }
        catch
        {
            return null;
        }
    }
}