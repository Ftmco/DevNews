using ViewModel.Account;

namespace Article.Web.Server.V2.Controllers.Global;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountRules _account;

    public AccountController(IAccountRules account)
    {
        _account = account;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginViewModel login)
    {
        LoginResponse? loginUser = await _account.LoginAsync(login);
        return loginUser.Status switch
        {
            LoginStatus.Success => Ok(Success("Success To Login", "", loginUser.Session)),
            LoginStatus.UserNotFound => Ok(Faild(404, "User Not found", "")),
            LoginStatus.Exception => Ok(ApiException("Exception to Login", "")),
            LoginStatus.UserNotActive => Ok(Faild(403, "User Not Actived", "Please Active Yout Account And Try Again")),
            _ => Ok(ApiException("Exception to Login", "")),
        };
    }

    [HttpPost("LoginEnc")]
    public async Task<IActionResult> Login(ApiRequest request)
    {
        LoginResponse? loginUser = await _account.LoginAsync(request, HttpContext);
        return loginUser.Status switch
        {
            LoginStatus.Success => Ok(await Success("Success To Login", "", loginUser.Session).SendResponseAsync(HttpContext)),
            LoginStatus.UserNotFound => Ok(await Faild(404, "User Not found", "").SendResponseAsync(HttpContext)),
            LoginStatus.Exception => Ok(await ApiException("Exception to Login", "").SendResponseAsync(HttpContext)),
            LoginStatus.UserNotActive => Ok(await Faild(403, "User Not Actived", "Please Active Yout Account And Try Again").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception to Login", "").SendResponseAsync(HttpContext)),
        };
    }

    [HttpPost("SignUp")]
    public async Task<IActionResult> SignUp(SignUpViewModel signUp)
        => await _account.SignUpAsync(signUp) switch
        {
            SignUpStatus.Success => Ok(Success("Account Created Successfully", "", new { })),
            SignUpStatus.UserExist => Ok(Faild(403, "User Exist", "")),
            SignUpStatus.Exception => Ok(ApiException("Exception To Create Account", "")),
            _ => Ok(ApiException("Exception To Create Account", "")),
        };

    [HttpPost("Activation")]
    public async Task<IActionResult> Activation(ActivationViewModel activation)
        => await _account.ActivationAsync(activation) switch
        {
            ActivationStatus.Success => Ok(Success("Account Actived", "", new { })),
            ActivationStatus.UserNotFound => Ok(Faild(404, "User Not Found", "")),
            ActivationStatus.Exception => Ok(ApiException("Exception To Active Account", "")),
            ActivationStatus.WrongCode => Ok(Faild(403, "Wrong Active Code", "")),
            _ => Ok(ApiException("Exception To Active Account", "")),
        };

    [HttpPost("SignUpEnc")]
    public async Task<IActionResult> SignUp(ApiRequest request)
        => await _account.SignUpAsync(request, HttpContext) switch
        {
            SignUpStatus.Success => Ok(await Success("Account Created Successfully", "", new { }).SendResponseAsync(HttpContext)),
            SignUpStatus.UserExist => Ok(await Faild(403, "User Exist", "").SendResponseAsync(HttpContext)),
            SignUpStatus.Exception => Ok(await ApiException("Exception To Create Account", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception To Create Account", "").SendResponseAsync(HttpContext)),
        };

    [HttpPost("ActivationEnc")]
    public async Task<IActionResult> Activation(ApiRequest request)
        => await _account.ActivationAsync(request, HttpContext) switch
        {
            ActivationStatus.Success => Ok(await Success("Account Actived", "", new { }).SendResponseAsync(HttpContext)),
            ActivationStatus.UserNotFound => Ok(await Faild(404, "User Not Found", "").SendResponseAsync(HttpContext)),
            ActivationStatus.Exception => Ok(await ApiException("Exception To Active Account", "").SendResponseAsync(HttpContext)),
            ActivationStatus.WrongCode => Ok(await Faild(403, "Wrong Active Code", "").SendResponseAsync(HttpContext)),
            _ => Ok(await ApiException("Exception To Active Account", "").SendResponseAsync(HttpContext)),
        };
}
