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
| `catalog` | 翻訳カタログ型 `int` |

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
