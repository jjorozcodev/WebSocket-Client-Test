var wsUri = "ws://echo.websocket.org/";
var output;
var socket;

function init() {
  output = document.getElementById("output");

  if (window.WebSocket) {
    // WebSocket supported
    writeToScreen("WebSocket supported");
    testWebSocket();
  } else {
    // WebSocket not supported
    writeToScreen("WebSocket not supported");
  }
}

function testWebSocket() {
  socket = new WebSocket(wsUri);
  socket.onopen = function (evt) {
    onOpen(evt);
  };
  socket.onclose = function (evt) {
    onClose(evt);
  };
  socket.onmessage = function (evt) {
    onMessage(evt);
  };
  socket.onerror = function (evt) {
    onError(evt);
  };
}

function onOpen(evt) {
  writeToScreen("CONNECTED");
  doSend("WebSocket is on the air");
}

function onClose(evt) {
  writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
  writeToScreen(
    '<span style="color: blue;">RESPONSE: ' + evt.data.toString() + "</span>"
  );
  socket.close();
}

function onError(evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
  if (socket.readyState != WebSocket.OPEN) return;

  //if (socket.bufferedAmount < someBufferThresholdinBytes) {
  //    socket.send(message);
  //}

  socket.send(message);
  writeToScreen("SENT: " + message);

  var a = new Uint8Array([8, 6, 7, 3, 5, 9.0]);
  socket.send(a.buffer);
}

function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

// should probably use jQuery.ready here
if (window.addEventListener) {
  // for W3C DOM
  window.addEventListener("load", init, false);
} else {
  // legacy IE
  window.attachEvent("onload", init);
}
