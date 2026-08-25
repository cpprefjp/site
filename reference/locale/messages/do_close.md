# do_close
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
protected:
  virtual void do_close(catalog cat) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]

## 概要
メッセージカタログを閉じる。[`close()`](close.md)から呼び出される仮想関数である。


## 事前条件
`cat`が[`open()`](open.md)から取得され、まだ閉じられていないカタログであること。


## 効果
`cat`に関連付けられた未規定のリソースを解放する。


## 戻り値
なし


## 備考
そのようなリソースの上限は、存在する場合、処理系定義である。

## バージョン
### 言語
- C++98


## 関連項目
- [`messages::close`](close.md)
