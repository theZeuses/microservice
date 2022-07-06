using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using log_service.Models;  
using log_service.Services;    

namespace log_service.Controllers  
{  
    [Route("api/v1/messaging-logs")]  
    [ApiController]  
    public class MessagingLogController : ControllerBase  
    {  
        private readonly MessagingLogService _messagingLogService;  
  
        public MessagingLogController(MessagingLogService messagingLogService)  
        {  
            _messagingLogService = messagingLogService;  
        }  
  
        [HttpGet]  
        public async Task<List<MessagingLog>> Get(){
            return await _messagingLogService.GetAsync();
        }  

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessagingLog messagingLog){
            await _messagingLogService.CreateAsync(messagingLog);
            return CreatedAtAction(nameof(Get), new { id = messagingLog.Id }, messagingLog);
        }
    }  
}  