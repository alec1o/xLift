using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Database;
using Sisma.Handler;
using Sisma.Models;
using System;
using System.Runtime.CompilerServices;
using System.Text;

namespace Sisma.Controller;

public class RootController
{
    private readonly static object roomLock = new object();
    public readonly Client Client;
    private const string ERROR_KEY = "error";
    private const string ERROR_VALUE = "Bad request";

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
                    case "ROOM_GET": return Room_Get();
                    case "ROOM_GETALL": return Room_GetAll();
                    case "ROOM_DESTROY": return Room_Destroy(ref buffer);
                    case "ROOM_REGISTER": return Room_Register(ref buffer);

                    // MATCH
                    case "MATCH_GET": return Match_Get();
                    case "MATCH_GETALL": return Match_GetAll();
                    case "MATCH_DESTROY": return Match_Destroy();
                    case "MATCH_REGISTER": return Match_Register();
                }
            }
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }

    #region USER

    private bool User_Get(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, bool online, bool error) result = new(null, false, false);

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
                            result.online = true;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub);

        Dictionary<string, dynamic> response = new();

        response.Add("sisma", "USER_GET.RESULT");
        response.Add("success", !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, ERROR_VALUE);
        }
        else
        {
            response.Add("sub", result.sub ?? string.Empty);
            response.Add("online", result.online);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool User_GetAll()
    {
        var subs = new List<Dictionary<string, dynamic>>();

        foreach (var client in Client.Server.Clients)
        {
            if (client.User.SuperUser) continue;

            var sub = new Dictionary<string, dynamic>();
            sub.Add("sub", client.User.UID);
            sub.Add("online", true);
            subs.Add(sub);
        }

        Dictionary<string, dynamic> response = new();
        response.Add("sisma", "USER_GETALL.RESULT");
        response.Add("subs", subs);
        response.Add("length", subs.Count);

        Client.Send(JsonConvert.SerializeObject(response));

        return true;
    }

    private bool User_Destroy(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, bool error) result = new(null, false);

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
                            client.Server.Socket.DisconnectClient(client.Connection.Client.Guid);
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub);

        Dictionary<string, dynamic> response = new();

        response.Add("sisma", "USER_DESTROY.RESULT");
        response.Add("success", !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, ERROR_VALUE);
        }
        else
        {
            response.Add("sub", result.sub ?? string.Empty);
            response.Add("destroyed", true);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool User_Forward(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? sub, string? message, bool forwarded, bool error) result = new(null, null, false, false);

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
                            result.forwarded = true;
                            break;
                        }
                    }
                }
            }
            catch (Exception e) { Output.Show(e); }
        }

        result.error = string.IsNullOrWhiteSpace(result.sub) || string.IsNullOrWhiteSpace(result.message);

        Dictionary<string, dynamic> response = new();

        response.Add("sisma", "USER_FORWARD.RESULT");
        response.Add("success", !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, ERROR_VALUE);
        }
        else
        {
            response.Add("sub", result.sub ?? string.Empty);
            response.Add("forwarded", result.forwarded);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    #endregion

    #region ROOM

    private bool Room_Get()
    {
        throw new NotImplementedException();
    }

    private bool Room_GetAll()
    {
        lock (roomLock)
        {
            Dictionary<string, dynamic> response = new();
            response.Add("sisma", "ROOM_GETALL.RESULT");
            response.Add("rooms", Client.Server.Rooms);
            response.Add("length", Client.Server.Rooms.Count);

            Client.Send(JsonConvert.SerializeObject(response));
        }

        return true;
    }

    private bool Room_Destroy(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        (string? uid, bool error) result = new(null, false);

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

        Dictionary<string, dynamic> response = new();

        response.Add("sisma", "ROOM_DESTROY.RESULT");
        response.Add("success", !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, ERROR_VALUE);
        }
        else
        {
            response.Add("UID", result.uid ?? string.Empty);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    private bool Room_Register(ref byte[] buffer)
    {
        var json = Encoding.UTF8.GetString(buffer);

        (Room? room, bool error, string errorMessage) result = new(null, false, ERROR_VALUE);

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

        response.Add("sisma", "ROOM_REGISTER.RESULT");
        response.Add("success", !result.error);

        if (result.error)
        {
            response.Add(ERROR_KEY, result.errorMessage);
        }
        else
        {
            response.Add("room", result.room);
        }

        Client.Send(JsonConvert.SerializeObject(response));
        return result.error;
    }

    #endregion

    #region MATCH

    private bool Match_Get()
    {
        throw new NotImplementedException();
    }

    private bool Match_GetAll()
    {
        throw new NotImplementedException();
    }

    private bool Match_Destroy()
    {
        throw new NotImplementedException();
    }

    private bool Match_Register()
    {
        throw new NotImplementedException();
    }

    #endregion
}