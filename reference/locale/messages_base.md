# messages_base
* locale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class messages_base;
}
```

## 概要
`messages_base`は、メッセージカタログを識別するための型を定義する基底クラスである。

[`messages`](messages.md)はこのクラスを継承しており、[`messages::open()`](messages/open.md)が返し、[`messages::get()`](messages/get.md)と[`messages::close()`](messages/close.md)が受け取る値の型が`catalog`である。

### メンバ型

| 名前 | 説明 |
|----------------------|----------------------------------------|
| `catalog` | 翻訳カタログ型<br/>・C++98 : `int`<br/>・C++14 : 未規定の符号付き整数型 |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::locale loc = std::locale::classic();
  const auto& msgs = std::use_facet<std::messages<char>>(loc);

  // open()の戻り値の型がmessages_base::catalogである
  std::messages_base::catalog cat = msgs.open("nonexistent_catalog", loc);

  if (cat >= 0) {
    msgs.close(cat);
  }

  std::cout << "done" << std::endl;
}
```
* std::messages_base::catalog[color ff0000]
* std::messages[link messages.md]
* msgs.open[link messages/open.md]
* msgs.close[link messages/close.md]
* std::use_facet[link use_facet.md]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]

### 出力
```
done
```


## バージョン
### 言語
- C++98


## 関連項目
- [`messages`](messages.md)
- [`messages::open`](messages/open.md)


## 参照
- [LWG Issue 2028. `messages_base::catalog` overspecified](https://cplusplus.github.io/LWG/issue2028)
    - C++14で、`catalog`の型が`int`から未規定の符号付き整数型に変更された。POSIXのメッセージカタログAPIが使用する`nl_catd`は未規定の型であり（macOSでは`void*`）、`int`に固定すると処理系がOSの提供するメッセージカタログ機能をそのまま利用できなかったため
