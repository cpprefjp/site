# do_get
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type
    do_get(catalog cat,
           int set,
           int msgid,
           const string_type& dfault) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]

## 概要
メッセージカタログから、対応する翻訳メッセージを取得する。[`get()`](get.md)から呼び出される仮想関数である。


## 事前条件
`cat`が[`open()`](open.md)から取得され、まだ閉じられていないカタログであること。


## 戻り値
処理系定義の対応付けに従い、実引数`set`、`msgid`、`dfault`によって識別されるメッセージを返す。

そのようなメッセージが見つからない場合は、`dfault`を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`messages::get`](get.md)
