using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using Shop.Data;
using Shop.Model.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

[assembly: OwinStartup(typeof(Shop.Web.App_Start.Startup))]

namespace Shop.Web.App_Start
{

    // này là phần code mẫu owin cũng thực hiện như thế 
    // starup.auth partial staup
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        // phương thức cấu hình Authenapplicatin của toàn ứng dụng bao gồm cáo cấu hi1n2nh context, authen, login
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            app.CreatePerOwinContext(TeduShopDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
            //PerOwin context quản lí userManager      (giảm phụ thuộc)
            app.CreatePerOwinContext<UserManager<ApplicationUser>>(CreateManager);
            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                // chưa đăng nhập chuyển qua login oauthen để chứng thực
                TokenEndpointPath = new PathString("/oauth/token"),
                Provider = new AuthorizationServerProvider(), // 
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30), // cho phep expirer tokken  trog vòng 30p
                AllowInsecureHttp = true, // cho phép validate qua ứng dụng client

            });
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "",
            //    ClientSecret = ""
            //});
        }
        public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
        {
            //khi đăng nhập gửi lên server 1 request vaf validated tất cả các request 
            public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
            {
                context.Validated();
            }
            public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
            {
                // cho phép đăng nhập từ các đôi bên khác(access origin)
                var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");
                // khi mà ("as:clientAllowedOrigin") == nul thì cho phép tất cả các tên đăng nhập khác

                if (allowedOrigin == null) allowedOrigin = "*";

                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
                // tạo uerManager 
                UserManager<ApplicationUser> userManager = context.OwinContext.GetUserManager<UserManager<ApplicationUser>>();
                ApplicationUser user;
                try
                {
                    // tương tác và tìm kiếm đăng nhập user password trong database
                    user = await userManager.FindAsync(context.UserName, context.Password);
                }
                catch
                {
                    // sai thì thì sever error
                    // Could not retrieve the user due to error.
                    context.SetError("server_error");
                    context.Rejected();
                    return;
                }
                if (user != null)
                {
                    // user != nul đang nhập thành công sẽ tao ra Claim đễ chứa thông tin user gán và validated
                    ClaimsIdentity identity = await userManager.CreateIdentityAsync(
                                                           user,
                                                           DefaultAuthenticationTypes.ExternalBearer);
                    context.Validated(identity);
                }
                else
                {
                    // sai trả về
                    context.SetError("invalid_grant", "Tài khoản hoặc mật khẩu không đúng.'");
                    context.Rejected();
                }
            }
        }


        // quản lí user
        private static UserManager<ApplicationUser> CreateManager(IdentityFactoryOptions<UserManager<ApplicationUser>> options, IOwinContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context.Get<TeduShopDbContext>());
            var owinManager = new UserManager<ApplicationUser>(userStore);
            return owinManager;
        }
    }


}