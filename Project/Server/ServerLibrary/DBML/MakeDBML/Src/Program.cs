using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using System.IO;

namespace ConsoleApplication1
{
    class Program
    {
        static void LoadModifiedMapping(string mappingFile,
             IDictionary<string, string> attributesToModify)
        {
            XElement mapping = XElement.Load(mappingFile);

            foreach (var column in mapping.Descendants())
            {
                if ((column.Name.LocalName == "Column") && !(column.Attribute("IsPrimaryKey") != null))
                    foreach (string key in attributesToModify.Keys)
                    {
                        column.SetAttributeValue(key, attributesToModify[key]);
                    }
            }
            mapping.Save(mappingFile + ".res");
        }
        static void Main(string[] args)
        {
            Dictionary<string, string> attributes = new Dictionary<string, string>();
            attributes["UpdateCheck"] = "Never";
            if (args[0] != "")
              LoadModifiedMapping(args[0], attributes);
        }

    }
}
