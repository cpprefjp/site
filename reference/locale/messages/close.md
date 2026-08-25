# close
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
void close(catalog cat) const; // (1) C++98
```
* catalog[link /reference/locale/messages_base.md]

## 概要
メッセージカタログを閉じる。


## 効果
[`do_close(cat)`](do_close.md)を呼び出す。


## 戻り値
なし

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
    std::cout << msgs.get(cat, 1, 1, "default message") << std::endl;

    // 使い終わったカタログを閉じる
    msgs.close(cat);

    std::cout << "closed" << std::endl;
  }
}
```
* close[color ff0000]
* msgs.open[link open.md]
* msgs.get[link get.md]
* std::messages[link /reference/locale/messages.md]
* std::messages_base::catalog[link /reference/locale/messages_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力例
```
Hello, world!
closed
```

- カタログを用意していない場合や、カタログ機構を持たない処理系では異なる結果となる。詳細は[`messages`](/reference/locale/messages.md)クラスのページを参照


## バージョン
### 言語
- C++98


## 関連項目
- [`messages::do_close`](do_close.md)
- [`messages::open`](open.md)
