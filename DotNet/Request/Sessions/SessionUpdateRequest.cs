using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Sessions
{
    public class SessionUpdateRequest : SessionAddRequest, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
