# messages
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class messages : public locale::facet, public messages_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* messages_base[link /reference/locale/messages_base.md]

## 概要
`messages`は、メッセージカタログから翻訳済みメッセージを取得するためのロケールファセットである。

カタログの識別方法やメッセージの対応付けは処理系定義であり、POSIX環境では`catgets`や`gettext`のような仕組みに対応付けられる。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------|
| [`(constructor)`](messages/op_constructor.md) | コンストラクタ |
| [`open`](messages/open.md) | 翻訳カタログを開く |
| [`get`](messages/get.md) | 翻訳メッセージを取得する |
| [`close`](messages/close.md) | 翻訳カタログを閉じる |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------------------------|
| [`(destructor)`](messages/op_destructor.md) | デストラクタ |
| [`do_open`](messages/do_open.md) | 翻訳カタログを開く (virtual) |
| [`do_get`](messages/do_get.md) | 翻訳メッセージを取得する (virtual) |
| [`do_close`](messages/do_close.md) | 翻訳カタログを閉じる (virtual) |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::locale loc = std::locale::classic();
  const auto& msgs = std::use_facet<std::messages<char>>(loc);

  // メッセージカタログを開く
  std::messages_base::catalog cat = msgs.open("hello", loc);

  if (cat < 0) {
    std::cout << "cannot open" << std::endl;
  }
  else {
    // 第2引数はセット番号、第3引数はメッセージ番号、
    // 第4引数はメッセージが見つからなかった場合の既定値
    std::cout << msgs.get(cat, 1, 1, "default message") << std::endl;

    msgs.close(cat);
  }
}
```
* std::messages[color ff0000]
* std::messages_base::catalog[link messages_base.md]
* msgs.open[link messages/open.md]
* msgs.get[link messages/get.md]
* msgs.close[link messages/close.md]
* std::use_facet[link use_facet.md]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]

#### 出力例
```
default message
```

- カタログ名からカタログへの対応付け、およびメッセージの対応付けは処理系定義である
- カタログを用意していない場合、カタログを開けない処理系では`cannot open`が、開ける処理系では既定値`default message`が出力される

### 用意したメッセージカタログから翻訳メッセージを取得する
カタログの形式と探索方法は処理系定義であるため、あらかじめ処理系が要求する形式でカタログを用意する必要がある。以下は、POSIXの`catgets`形式のカタログを使用する処理系（libc++等）での例である。

まず、メッセージのソースファイル`hello.msg`を用意する。

```
$set 1
1 Hello, world!
2 Goodbye
```

これをPOSIXの`gencat`コマンドでカタログファイルへ変換する。

```
gencat hello.cat hello.msg
```

このカタログを開いて、セット番号`1`・メッセージ番号`1`のメッセージを取得する。

```cpp
#include <iostream>
#include <locale>

int main()
{
  std::locale loc = std::locale::classic();
  const auto& msgs = std::use_facet<std::messages<char>>(loc);

  std::messages_base::catalog cat = msgs.open("./hello.cat", loc);

  if (cat >= 0) {
    // カタログに登録されているメッセージが返る
    std::cout << msgs.get(cat, 1, 1, "default message") << std::endl;

    msgs.close(cat);
  }
}
```
* std::messages[color ff0000]
* std::messages_base::catalog[link messages_base.md]
* msgs.open[link messages/open.md]
* msgs.get[link messages/get.md]
* msgs.close[link messages/close.md]
* std::use_facet[link use_facet.md]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]

#### 出力例
```
Hello, world!
```

- GNU gettext形式のカタログを使用する処理系（NLSを有効にしたlibstdc++等）では、`msgfmt`コマンドで作成した`.mo`ファイルを、`open()`にドメイン名を渡して使用する
- カタログ機構を持たない処理系（macOS上のlibstdc++等）では、`open()`は成功するが`get()`は常に既定値を返す

## バージョン
### 言語
- C++98


## 関連項目
- [`messages_base`](messages_base.md)
- [`messages_byname`](messages_byname.md)
- [`locale`](locale.md)
