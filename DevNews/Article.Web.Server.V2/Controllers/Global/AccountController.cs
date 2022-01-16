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
}
