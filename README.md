## フォルダ構成
以下に説明を載せる．追加，変更の際は適宜変えること．
```
/
├ pc.html : 管理者側のhtml．
├ pc.css : 管理者側のcss．
| pen.html : 生徒側のhtml.
├ components/ : jsの関数は以下に置くこと．
| ├ pc/ : pc側のコンポーネント．
| | ├ ConnectServer.js : サーバー(achex)に接続する．
| | ├ DrawingCharts.js : 長考中と取り組み中の割合を示す円グラフの表示．
| | ├ Pc.js : pc.htmlが参照するpcで使うコンポーネントを束ねる．
| | ├ ReceivePc.js : pc.jsにインポートできるように受信系のコンポーネントを束ねる．
| | ├ SendPc.js :  pc.jsにインポートできるように送信系のコンポーネントを束ねる．
| | ├ receive/ :通信データを受け取り実行するコンポーネント．
| | | └ SeatJudge.js : 状態(state)をRPi側から受け取り，そのような状態にGUI上のボタンの色などを変更する．
| | └ send/ :通信データとしてセンサの情報などを送信するコンポーネントを束ねる．
| |   ├ ChangeName.js : 名前を変更するところを作る．
| |   ├ Onlight.js : ライトを光らせるためにRPi側に情報を渡す．
| |   └ OnVibration.js :手動ボタンでバイブレーションを光らせるためにRPi側に情報を渡す．また，閾値以上に他の生徒のペンが止まっていると全員に通知するルーチンもここでおこなう．
| └ rpi/
|  ├ ConnectServer.js : サーバー(achex)に接続する．
|  ├ RPi.js : pen.htmlが参照するRPiで使うコンポーネントを束ねる．
|  ├ ReceiveRPi.js : RPi.jsにインポートできるように受信系のコンポーネントを束ねる．
|  └ SendRPi.js : RPi.jsにインポートできるように送信系のコンポーネントを束ねる．
|   ├ receive/ :通信データを受け取り実行するコンポーネント．
|   | ├ LightVibration.js : 受け取ったメッセージがライトかバイブレーションだったらぽーとを開いて動かす．
|   | └ ReflectName.js : メッセージで変更した名前をうけとり，pen.htmlのNAMEにも反映される．
|   └ receive/ :通信データを受け取り実行する．
|     ├ Accelerator.js : 加速度センサでペンが止まっているか判断して結果をpc側に送信する．
|     ├ StandSwitch.js : ペン立ての底にあるスイッチを押して状態を"完了"にする．
|     └ TactSwitch.js : "秘匿モード"の解除，接続できるタクトスイッチの情報を投げる．
├ README.md : 説明書．
```
