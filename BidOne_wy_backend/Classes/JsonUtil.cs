using Newtonsoft.Json;

namespace BidOne_wy_backend.Classes
{
    public class JsonUtil
    {
        private static readonly JsonSerializerSettings _options
        = new() { NullValueHandling = NullValueHandling.Ignore };

        public static void SimpleWrite(object obj, string fileName)
        {
            using var outputFile = File.CreateText(fileName);
            using var jsonTxtWriter = new JsonTextWriter(outputFile);
            JsonSerializer.CreateDefault(_options).Serialize(jsonTxtWriter, obj);
        }
    }
}
