# time_base
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  class time_base;
}
```

## 概要
`time_base`は、日付の要素（日・月・年）の並び順を表す列挙型を定義する基底クラスである。

[`time_get`](time_get.md)はこのクラスを継承しており、[`time_get::date_order()`](time_get/date_order.md)がこの列挙値を返す。

### メンバ型

| 名前 | 説明 |
|------------------------|--------------------------------------|
| `dateorder` | 日付の表記順を表す列挙型 |

### dateorder列挙値

| 名前 | 説明 |
|-----------------------|--------------------------------|
| `no_order` | 特定の順序を持たない |
| `dmy` | 日、月、年の順番 |
| `mdy` | 月、日、年の順番 |
| `ymd` | 年、月、日の順番 |
| `ydm` | 年、日、月の順番 |


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& facet = std::use_facet<std::time_get<char>>(std::locale::classic());

  std::cout << std::boolalpha
            << (facet.date_order() == std::time_base::no_order) << std::endl;
}
```
* std::time_base::no_order[color ff0000]
* std::time_get[link time_get.md]
* facet.date_order()[link time_get/date_order.md]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]

### 出力例
```
false
```

- 返る値はロケールおよび処理系に依存する。`"C"`ロケールに対して`no_order`を返す処理系もあれば、`mdy`を返す処理系もある


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get`](time_get.md)
- [`time_get::date_order`](time_get/date_order.md)
