using BidOne_wy_backend.Classes;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web.Http;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace BidOne_wy_backend.Controllers
{
    [Route("api/simpleform")]
    [ApiController]
    public class SimpleFormController : ControllerBase
    {
        private readonly ILogger<SimpleFormController> _logger;

        public SimpleFormController(ILogger<SimpleFormController> logger)
        {
            _logger = logger;
        }

        [HttpPost("submitform")]
        public IActionResult SubmitForm(SimpleForm formData)
        {
            try
            {
                const string filePrefix = "SimpleForm_";
                string filePath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                DateTime dtNow = DateTime.Now;
                string fileName = filePath + '\\' + filePrefix + dtNow.ToFileTime().ToString();
                JsonUtil.SimpleWrite(formData, fileName);
                
                return Ok();
            } catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}