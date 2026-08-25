# do_open
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
protected:
  virtual catalog do_open(const string& name, const locale& loc) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]
* locale[link /reference/locale/locale.md]
* string[link /reference/string/basic_string.md]

## 概要
メッセージカタログを開く。[`open()`](open.md)から呼び出される仮想関数である。


## 戻り値
処理系定義の対応付けに従い、文字列`name`が識別するメッセージカタログからメッセージを取得するために、[`get()`](get.md)へ渡せる値を返す。この値は[`close()`](close.md)へ渡されるまで使用できる。

そのようなカタログを開けない場合は、`0`より小さい値を返す。


## 備考
`loc`は、必要な場合にメッセージ取得時の文字集合の変換のために使用される。

## バージョン
### 言語
- C++98


## 関連項目
- [`messages::open`](open.md)
