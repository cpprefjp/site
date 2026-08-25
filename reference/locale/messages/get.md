# get
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
string_type
  get(catalog cat,
      int set,
      int msgid,
      const string_type& dfault) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]

## 概要
メッセージカタログから、対応する翻訳メッセージを取得する。


## 戻り値
[`do_get(cat, set, msgid, dfault)`](do_get.md)

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

  std::messages_base::catalog cat = msgs.open("./hello.cat", loc);

  if (cat >= 0) {
    // セット番号1、メッセージ番号1のメッセージを取得する
    std::cout << msgs.get(cat, 1, 1, "default message") << std::endl;

    // 存在しないメッセージ番号を指定した場合は、第4引数の既定値が返る
    std::cout << msgs.get(cat, 1, 99, "default message") << std::endl;

    msgs.close(cat);
  }
}
```
* get[color ff0000]
* msgs.open[link open.md]
* msgs.close[link close.md]
* std::messages[link /reference/locale/messages.md]
* std::messages_base::catalog[link /reference/locale/messages_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力例
```
Hello, world!
default message
```

- カタログを用意していない場合や、カタログ機構を持たない処理系では異なる結果となる。詳細は[`messages`](/reference/locale/messages.md)クラスのページを参照


## バージョン
### 言語
- C++98


## 関連項目
- [`messages::do_get`](do_get.md)
- [`messages::open`](open.md)
