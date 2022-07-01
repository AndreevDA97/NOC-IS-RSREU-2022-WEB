using System;
using System.Configuration;

namespace AbonentPlus.PaySystem.VersionNs
{
    public class VersionNo
    {
        public int Major { get; set; }
        public int Minor { get; set; }
        public int Revision { get; set; }
        public int Build { get; set; }
        public string VersionStr { get; set; }
        public string DatabaseStr { get; set; }
        public VersionNo(Version version)
        {
            Major = version.Major;
            Minor = version.Minor;
            Revision = version.Revision;
            Build = version.Build;
            VersionStr = version.ToString();

            // определить текущий тестовый контур БД
            string alphaStr = "Alpha", betaStr = "Beta";
            var connectionString = ConfigurationManager
                .ConnectionStrings["PaysystemConnectionString"]?.ConnectionString ?? "";
            var isAlpha = connectionString.ToLower().Contains(alphaStr.ToLower());
            var isBeta = connectionString.ToLower().Contains(betaStr.ToLower());
            DatabaseStr = (isAlpha ? alphaStr : "") + (isBeta ? betaStr : "");
        }
        public override string ToString()
        {
            return VersionStr;
        }
    }
}
