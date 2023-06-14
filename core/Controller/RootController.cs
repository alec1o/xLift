using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Database;
using Sisma.Handler;
using Sisma.Models;
using System.Text;

namespace Sisma.Controller;

public class RootController
{
    private readonly static object roomLock = new object();
    public readonly Client Client;

    private const string SISMA_KEY = "sisma";
    private const string SUCCESS_KEY = "success";
    private const string ROOM_KEY = "room";
    private const string ROOMS_KEY = "rooms";
    private const string MATCH_KEY = "match";
    private const string MATCHES_KEY = "matches";
    private const string EXIST_KEY = "exist";
    private const string ERROR_KEY = "error";
    private const string DESTROYED_KEY = "destroyed";
    private const string LENGTH_KEY = "length";
    private const string USER_KEY = "user";
    private const string USERS_KEY = "users";
    private const string FORWARDED_KEY = "forwarded";
    private const string DEFAULT_ERROR_MESSAGE = "Bad request";

    public RootController(Client client) { this.Client = client; }

    public bool OnMessage(byte[] buffer)
    {
        try
        {
            Template.Message? message = JsonConvert.DeserializeObject<Template.Message>(Encoding.UTF8.GetString(buffer));

            if (message != null)
            {
                switch (message.sisma.ToUpper())
                {
                    // USER
                    case "USER_GET": return User_Get(ref buffer);
                    case "USER_GETALL": return User_GetAll();
                    case "USER_DESTROY": return User_Destroy(ref buffer);
                    case "USER_FORWARD": return User_Forward(ref buffer);

                    // ROOM
                    case "ROOM_GET": return Room_Get(ref buffer);
                    case "ROOM_GETALL": return Room_GetAll();
                    case "ROOM_DESTROY": return Room_Destroy(ref buffer);
                    case "ROOM_REGISTER": return Room_Register(ref buffer);

                    // MATCH
                    case "MATCH_GET": return Match_Get(ref buffer);
                    case "MATCH_GETALL": return Match_GetAll();

#if false
                    case "MATCH_DESTROY": return Match_Destroy();
                    case "MATCH_REGISTER": return Match_Register();
#endif
                    // CLUSTER
                    case "CLUSTER.SHOW": return ClusterShow(ref buffer);
                    case "CLUSTER.SHOWALL": return ClusterShowAll(ref buffer);
                }
            }
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }

    private bool ClusterShow(ref byte[] buffer)
    {
        var data = new Dictionary<string, dynamic?>();
        data.Add("SISMA".ToLower(), "CLUSTER.SHOW");

        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(Encoding.UTF8.GetString(buffer));

        if (request == null)
        {
            data.Add("DATA".ToLower(), null);
            data.Add("SIZE".ToLower(), 0);

            data.Add("ERROR".ToLower(), true);
            data.Add("ALERT".ToLower(), DEFAULT_ERROR_MESSAGE);

            Client.Send(JsonConvert.SerializeObject(data));
            return false;
        }

        var id = request.FirstOrDefault(x => x.Key == "id").Value;

        if (id == null || string.IsNullOrWhiteSpace(id))
        {
            data.Add("DATA".ToLower(), null);
            data.Add("SIZE".ToLower(), 0);

            data.Add("ERROR".ToLower(), true);
            data.Add("ALERT".ToLower(), "data not found -> {'id': 'string'}");

            Client.Send(JsonConvert.SerializeObject(data));
            return false;
        }

        var cluster = Client.Server.Clusters.ToArray().FirstOrDefault(x => x.id == id);

        if (cluster == null)
        {
            data.Add("DATA".ToLower(), null);
            data.Add("SIZE".ToLower(), 0);
        }
        else
        {
            data.Add("DATA".ToLower(), cluster);
            data.Add("SIZE".ToLower(), 1);
        }

        data.Add("ERROR".ToLower(), false);
        data.Add("ALERT".ToLower(), string.Empty);

        Client.Send(JsonConvert.SerializeObject(data));
        return true;
    }

    private bool ClusterShowAll(ref byte[] buffer)
    {
        var data = new Dictionary<string, dynamic?>();
        data.Add("SISMA".ToLower(), "CLUSTER.SHOWALL");

        var clusters = Client.Server.Clusters.ToArray();

        data.Add("DATA".ToLower(), clusters);
        data.Add("SIZE".ToLower(), clusters.Length);

        data.Add("ERROR".ToLower(), false);
        data.Add("ALERT".ToLower(), string.Empty);

        Client.Send(JsonConvert.SerializeObject(data));
        return true;
    }
    #region USER

    private bool User_Get(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, User? user, bool error) result = new(null, null, false);

        if (request != null)
        {
            try
            {
                result.sub = request.Where(x => x.Key == "sub").First().Value;

                if (!string.IsNullOrWhiteSpace(result.sub))
                {
                    foreach (var client in Client.Server.Clients)
                    {
                        if (client.User.UID == result.sub)
                        {
                            result.user = client.User;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "USER_GET.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(USER_KEY, result.user);
            response.Add(EXIST_KEY, result.user != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool User_GetAll()
    {
        Dictionary<string, dynamic> response = new();
        List<User> users = Client.Server.Clients.Where(x => x.User.SuperUser == false).Select(x => x.User).ToList();

        response.Add(SISMA_KEY, "USER_GETALL.RESULT");
        response.Add(SUCCESS_KEY, true);
        response.Add(USERS_KEY, users);
        response.Add(LENGTH_KEY, users.Count);

        Client.Send(JsonConvert.SerializeObject(response));

        return true;
    }

    private bool User_Destroy(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, User? user, bool error) result = new(null, null, false);

        if (request != null)
        {
            try
            {
                result.sub = request.Where(x => x.Key == "sub").First().Value;

                if (!string.IsNullOrWhiteSpace(result.sub))
                {
                    foreach (var client in Client.Server.Clients)
                    {
                        if (client.User.UID == result.sub)
                        {
                            result.user = client.User;
                            client.Server.Socket.DisconnectClient(client.Connection.Client.Guid);
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "USER_DESTROY.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(USER_KEY, result.user);
            response.Add(DESTROYED_KEY, result.user != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool User_Forward(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, string? message, User? user, bool error) result = new(null, null, null, false);

        if (request != null)
        {
            try
            {
                result.sub = request.Where(x => x.Key == "sub").First().Value;
                result.message = request.Where(x => x.Key == "message").First().Value;

                if (!string.IsNullOrWhiteSpace(result.sub) && !string.IsNullOrWhiteSpace(result.message))
                {
                    foreach (var client in Client.Server.Clients)
                    {
                        if (client.User.UID == result.sub)
                        {
                            client.Send(result.message);
                            result.user = client.User;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub) || string.IsNullOrWhiteSpace(result.message);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "USER_FORWARD.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(USER_KEY, result.user);
            response.Add(FORWARDED_KEY, result.user != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    #endregion

    #region ROOM

    private bool Room_Get(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? uid, Room? room, bool error) result = new(null, null, false);

        if (request != null)
        {
            try
            {
                result.uid = request.Where(x => x.Key == "UID").First().Value;

                result.uid = (result.uid == null) ? null : result.uid.Trim();

                if (!string.IsNullOrWhiteSpace(result.uid))
                {
                    foreach (var room in Client.Server.Rooms)
                    {
                        if (room.UID == result.uid)
                        {
                            result.room = room;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.uid);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "ROOM_GET.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(ROOM_KEY, result.room);
            response.Add(EXIST_KEY, result.room != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));

        return result.error;
    }

    private bool Room_GetAll()
    {
        lock (roomLock)
        {
            Dictionary<string, dynamic> response = new();
            response.Add(SISMA_KEY, "ROOM_GETALL.RESULT");
            response.Add(SUCCESS_KEY, true);
            response.Add(ROOMS_KEY, Client.Server.Rooms);
            response.Add(LENGTH_KEY, Client.Server.Rooms.Count);

            Client.Send(JsonConvert.SerializeObject(response));
        }

        return true;
    }

    private bool Room_Destroy(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? uid, Room? room, bool error) result = new(null, null, false);

        if (request != null)
        {
            try
            {
                result.uid = request.Where(x => x.Key == "UID").First().Value;

                if (result.uid != null)
                {
                    result.uid.Trim();
                }

                if (!string.IsNullOrWhiteSpace(result.uid))
                {
                    lock (roomLock)
                    {
                        var serverRooms = Client.Server.Rooms.ToArray();

                        foreach (var room in serverRooms)
                        {
                            if (room.UID == null) continue;

                            if (room.UID.Trim() == result.uid)
                            {
                                result.room = room;

                                // REMOVE ROOM FROM MEMORY
                                Client.Server.Rooms.Remove(room);

                                // REMOVE ROOM FROM DATABASE
                                var rooms = RoomDatabase.Load();

                                if (rooms != null)
                                {
                                    rooms = rooms.Where(x => x.UID != result.uid).ToList();
                                    RoomDatabase.Save(rooms);
                                }

                                break;
                            }
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.uid);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "ROOM_DESTROY.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(ROOM_KEY, result.room);
            response.Add(DESTROYED_KEY, result.room != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool Room_Register(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);

        (Room? room, bool error, string errorMessage) result = new(null, false, DEFAULT_ERROR_MESSAGE);

        try
        {
            lock (roomLock)
            {
                result.room = JsonConvert.DeserializeObject<Room>(json);

                if (result.room != null && Room.IsValid(result.room))
                {
                    var rooms = RoomDatabase.Load();

                    if (rooms != null)
                    {
                        foreach (var room in rooms)
                        {
                            // FIND ROOM IN DATABASE
                            if (room.Mode.ToLower() == result.room.Mode.ToLower())
                            {
                                result.errorMessage = "Mode name is reserved, try another name";
                                result.error = true;
                                break;
                            }
                        }
                    }

                    // ROOM NOT FOUND, REGISTER AS ROOM
                    if (result.error == false)
                    {
                        // REGISTER NEW ROOM
                        result.room.UID = Guid.NewGuid().ToString();

                        // SAVE ROOM IN DATABASE
                        rooms = rooms ?? new List<Room>();

                        rooms.Add(result.room);

                        if (RoomDatabase.Save(rooms))
                        {
                            Client.Server.Rooms.Add(result.room);
                        }
                        else
                        {
                            result.error = true;
                            result.errorMessage = "Internal error when saving the room";
                        }
                    }
                }
            }
        }
        catch (Exception e) { Output.Show(e); }

        if (result.error == false)
        {
            result.error = !Room.IsValid(result.room);
        }

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "ROOM_REGISTER.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, result.errorMessage);
        }
        else
        {
            response.Add(ROOM_KEY, result.room);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    #endregion

    #region MATCH

    private bool Match_Get(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? uid, Match? match, bool error) result = new(null, null, false);

        if (request != null)
        {
            try
            {
                result.uid = request.Where(x => x.Key == "UID").First().Value;

                result.uid = (result.uid == null) ? null : result.uid.Trim();

                if (!string.IsNullOrWhiteSpace(result.uid))
                {
                    foreach (var match in Client.Server.Matches)
                    {
                        if (match.UID == result.uid)
                        {
                            result.match = match;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.uid);

        Dictionary<string, dynamic?> response = new();

        response.Add(SISMA_KEY, "MATCH_GET.RESULT");
        response.Add(SUCCESS_KEY, !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, DEFAULT_ERROR_MESSAGE);
        }
        else
        {
            response.Add(MATCH_KEY, result.match);
            response.Add(EXIST_KEY, result.match != null);
        }

        Client.Send(JsonConvert.SerializeObject(response));

        return result.error;
    }

    private bool Match_GetAll()
    {
        Dictionary<string, dynamic> response = new();
        var matches = Client.Server.Matches.ToArray();

        response.Add(SISMA_KEY, "MATCH_GETALL.RESULT");
        response.Add(SUCCESS_KEY, true);
        response.Add(MATCHES_KEY, matches);
        response.Add(LENGTH_KEY, matches.Length);

        Client.Send(JsonConvert.SerializeObject(response));

        return true;
    }

#if false    
    private bool Match_Destroy()
    {
        throw new NotImplementedException();
    }

    private bool Match_Register()
    {
        throw new NotImplementedException();
    }
#endif

    #endregion
}