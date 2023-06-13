using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Models;
using System.Text;

namespace Sisma.Database;

public static class RoomDatabase
{
    public const string DATABASE_NAME = "ROOM.sisma.json";
    public readonly static string DATABASE_FOLDER = Path.Join(Environment.CurrentDirectory, "SISMA_DB");
    public readonly static string DATABASE_PATH = Path.Join(DATABASE_FOLDER, DATABASE_NAME);

    public static List<Room>? Load()
    {
        try
        {
            if (File.Exists(DATABASE_PATH))
            {
                using var file = File.OpenRead(DATABASE_PATH);

                if (file == null)
                {
                    return null;
                }

                byte[] buffer = new byte[file.Length];

                file.Read(buffer, 0, buffer.Length);
                file.Close();

                string json = Encoding.UTF8.GetString(buffer);

                return JsonConvert.DeserializeObject<List<Room>>(json);
            }
        }
        catch (Exception e) { Output.Show(e); }

        return null;
    }

    public static bool Save(List<Room> rooms)
    {
        try
        {
            if (!Directory.Exists(DATABASE_FOLDER))
            {
                var dir = Directory.CreateDirectory(DATABASE_FOLDER);

                if (!dir.Exists)
                {
                    return false;
                }
            }

            string json = JsonConvert.SerializeObject(rooms);

            byte[] buffer = Encoding.UTF8.GetBytes(json);

            if (File.Exists(DATABASE_PATH))
            {
                File.Delete(DATABASE_PATH);
            }

            using var file = File.OpenWrite(DATABASE_PATH);

            file.Write(buffer, 0, buffer.Length);

            file.Close();

            return true;
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }
}
