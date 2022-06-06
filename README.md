## 企画案
hackmdで企画案を書いたので以下を参考にすること．
- https://hackmd.io/@KnEIowo3QYKrLTXG-bKitw/SJV81I8D5/edit

## フォルダ構成
以下に説明を載せる．追加，変更の際は適宜変えること．
```
/
├ main.html : メイン画面．
|
├ demo.html : js関数などのテスト画面．
├ components/ : jsの関数は以下に置くこと．
| ├ pc/ : pc側のコンポーネント．
| | ├ DemoLV.js : デモ用のライトとバイブレーションに指示をする．
| | └ pcSwitch.js : スイッチの結果をもらい，pc側の画面を変更する．
| └ rpi/
|  ├ Accelerator.js : js関数などのテスト画面．
|  ├ LightVibration.js : js関数などのテスト画面．
|  └ Switch.js : js関数などのテスト画面．
└ remote_demo/ : リモート接続のテストのプログラムの保管場所．
  ├ pc.html : 管理者側のhtml．
  ├ pc.css : 管理者側のcss．
  └ pen.html : ユーザー側のhtml.
```
