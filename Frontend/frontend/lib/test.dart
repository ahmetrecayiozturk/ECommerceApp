import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as socket_io;
import 'package:logger/logger.dart';

class MyApp3 extends StatefulWidget {
  const MyApp3({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp3> {
  late socket_io.Socket socket;
  final logger = Logger();
  List<Map<String, String>> messages = [];
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    connectSocket();
  }

  void connectSocket() {
    socket = socket_io.io('http:// 172.20.240.1:3000', <String, dynamic>{
      'transports': ['websocket'],
      'query': {'email': 'user2'},
    });

    socket.on('connect', (_) {
      logger.d('Connected');
    });

    socket.on('message', (data) {
      logger.d('New message: $data');
      setState(() {
        messages.add({
          'sender': data['senderEmail'],
          'message': data['message'],
        });
      });
    });
  }

  void sendMessage() {
    if (_controller.text.isNotEmpty) {
      socket.emit('sendMessage', {
        'senderEmail': 'user2',
        'receiverEmail': 'user3',
        'message': _controller.text,
      });
      setState(() {
        messages.add({
          'sender': 'user2',
          'message': _controller.text,
        });
        _controller.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Socket.IO Chat'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(messages[index]['sender']!),
                  subtitle: Text(messages[index]['message']!),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Enter your message',
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/*
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as socket_io;
import 'package:logger/logger.dart';

class MyApp2 extends StatefulWidget {
  const MyApp2({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp2> {
  late socket_io.Socket socket;
  final logger = Logger();
  final List<String> messages = [];
  final TextEditingController messageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    connectSocket();
  }

  void connectSocket() {
    socket = socket_io.io('http://172.20.240.1:3000', <String, dynamic>{
      'transports': ['websocket'],
      'query': {'email': 'user2'},
    });

    socket.on('connect', (_) {
      logger.d('Connected');
    });

    socket.on('message', (data) {
      logger.d('New message: $data');
      setState(() {
        messages.add(data['message']);
      });
    });
  }

  void sendMessage() {
    String message = messageController.text;
    if (message.isNotEmpty) {
      socket.emit('sendMessage', {
        'senderEmail': 'user2',
        'receiverEmail': 'user3',
        'message': message
      });
      messageController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Socket.IO Chat'),
        ),
        body: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(messages[index]),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: messageController,
                      decoration: const InputDecoration(
                        labelText: 'Enter your message',
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: sendMessage,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(const MyApp2());
}
*/