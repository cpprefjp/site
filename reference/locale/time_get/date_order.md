# date_order
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
dateorder date_order() const; // (1) C++98
```
* dateorder[link /reference/locale/time_base.md]

## 概要
日付の要素（日・月・年）の並び順を取得する。


## 戻り値
[`do_date_order()`](do_date_order.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <stdexcept>

const char* to_string(std::time_base::dateorder order)
{
  switch (order) {
    case std::time_base::no_order: return "no_order";
    case std::time_base::dmy:      return "dmy";
    case std::time_base::mdy:      return "mdy";
    case std::time_base::ymd:      return "ymd";
    case std::time_base::ydm:      return "ydm";
  }
  return "";
}

int main()
{
  for (const char* name : {"C", "en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};
      const auto& facet = std::use_facet<std::time_get<char>>(loc);

      std::cout << name << " : " << to_string(facet.date_order()) << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* date_order[color ff0000]
* std::time_get[link /reference/locale/time_get.md]
* std::time_base::dateorder[link /reference/locale/time_base.md]
* std::time_base::no_order[link /reference/locale/time_base.md]
* std::time_base::dmy[link /reference/locale/time_base.md]
* std::time_base::mdy[link /reference/locale/time_base.md]
* std::time_base::ymd[link /reference/locale/time_base.md]
* std::time_base::ydm[link /reference/locale/time_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]

### 出力例
```
C : mdy
en_US.UTF-8 : mdy
ja_JP.UTF-8 : ymd
de_DE.UTF-8 : dmy
```

- 米国では月・日・年、日本では年・月・日、ドイツでは日・月・年の順である。この順序は[`get_date()`](get_date.md)が解析する書式を決める
- 日付書式が日・月・年以外の可変要素（週番号や曜日など）を含む場合は`no_order`が返る。`"C"`ロケールに対して何を返すかは処理系によって異なる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::do_date_order`](do_date_order.md)
- [`time_base`](/reference/locale/time_base.md)
- [`time_get::get_date`](get_date.md)
