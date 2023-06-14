using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Models;
using System.Text;

namespace Sisma.Database;

public static class SismaDatabase
{
    public const string ROOM_DB_NAME = "sisma.room.json";
    public const string CLUSTER_DB_NAME = "sisma.cluster.json";
    public readonly static string DB_FOLDER = Path.Join(Environment.CurrentDirectory, "SISMA_DB");
    public readonly static string ROOM_DB_PATH = Path.Join(DB_FOLDER, ROOM_DB_NAME);
    public readonly static string CLUSTER_DB_PATH = Path.Join(DB_FOLDER, CLUSTER_DB_NAME);

    public static List<Room>? LoadRoom()
    {
        return Load<List<Room>?>(ROOM_DB_PATH);
    }
    public static List<Cluster>? LoadCluster()
    {
        return Load<List<Cluster>?>(CLUSTER_DB_PATH);
    }

    private static T? Load<T>(string path)
    {
        try
        {
            if (File.Exists(path))
            {
                using var file = File.OpenRead(path);

                if (file == null)
                {
                    return default;
                }

                byte[] buffer = new byte[file.Length];

                file.Read(buffer, 0, buffer.Length);
                file.Close();

                string json = Encoding.UTF8.GetString(buffer);

                return JsonConvert.DeserializeObject<T>(json);
            }
        }
        catch (Exception e) { Output.Show(e); }

        return default;
    }

    private static bool Save(dynamic list, string path)
    {
        try
        {
            if (!Directory.Exists(DB_FOLDER))
            {
                var dir = Directory.CreateDirectory(DB_FOLDER);

                if (!dir.Exists)
                {
                    return false;
                }
            }

            string json = JsonConvert.SerializeObject(list);

            byte[] buffer = Encoding.UTF8.GetBytes(json);

            if (File.Exists(path))
            {
                File.Delete(path);
            }

            using var file = File.OpenWrite(path);

            file.Write(buffer, 0, buffer.Length);

            file.Close();

            return true;
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }

    public static bool SaveRoom(List<Room> rooms)
    {
        return Save(rooms, ROOM_DB_PATH);
    }

    public static bool SaveCluster(List<Cluster> clusters)
    {
        return Save(clusters, CLUSTER_DB_PATH);
    }
}
