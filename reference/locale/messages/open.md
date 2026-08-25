# open
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
catalog open(const string& name, const locale& loc) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]
* locale[link /reference/locale/locale.md]
* string[link /reference/string/basic_string.md]

## 概要
メッセージカタログを開く。


## 戻り値
[`do_open(name, loc)`](do_open.md)


## 備考
[`get()`](get.md)と[`close()`](close.md)の実引数として使用できる`catalog`型の値は、このメンバ関数を呼び出すことによってのみ取得できる。

## 例
メッセージカタログの形式と探索方法は処理系定義である。以下は、POSIXの`catgets`形式のカタログを使用する処理系での例である。

メッセージのソースファイル`hello.msg`を、

```
$set 1
1 Hello, world!
2 Goodbye
```

POSIXの`gencat`コマンドでカタログファイル`hello.cat`へ変換したものが存在するとする。

```
gencat hello.cat hello.msg
```

```cpp
#include <iostream>
#include <locale>

int main()
{
  std::locale loc = std::locale::classic();
  const auto& msgs = std::use_facet<std::messages<char>>(loc);

  // カタログを開く
  std::messages_base::catalog cat = msgs.open("./hello.cat", loc);

  // 開けた場合、0以上の値が返る
  std::cout << std::boolalpha << (cat >= 0) << std::endl;

  if (cat >= 0) {
    msgs.close(cat);
  }
}
```
* open[color ff0000]
* msgs.close[link close.md]
* std::messages[link /reference/locale/messages.md]
* std::messages_base::catalog[link /reference/locale/messages_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力例
```
true
```

- カタログを用意していない場合や、カタログ機構を持たない処理系では異なる結果となる。詳細は[`messages`](/reference/locale/messages.md)クラスのページを参照


## バージョン
### 言語
- C++98


## 関連項目
- [`messages::do_open`](do_open.md)
- [`messages::get`](get.md)
- [`messages::close`](close.md)
