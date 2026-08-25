# time_put
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class time_put : public locale::facet;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`time_put`は、[`std::tm`](/reference/ctime/tm.md)の内容を書式化して出力するためのロケールファセットである。書式指定子は[`std::strftime()`](/reference/ctime/strftime.md)と同一に解釈される。

テンプレートパラメータ`OutputIterator`は、出力に使用するイテレータの型を表し、既定では[`std::ostreambuf_iterator`](/reference/iterator/ostreambuf_iterator.md)`<charT>`である。

[`std::put_time`](/reference/iomanip/put_time.md)マニピュレータは、このファセットを介して日時の書式化を行う。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|---------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](time_put/op_constructor.md) | コンストラクタ |
| [`put`](time_put/put.md) | 日時を出力する |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|-----------------------|
| [`(destructor)`](time_put/op_destructor.md) | デストラクタ |
| [`do_put`](time_put/do_put.md) | 日時を出力する (virtual) |

## メンバ型

| 名前 | 説明 |
|-----------------------------------------------------------------------|----------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <ctime>

int main()
{
  std::tm t{};
  t.tm_year = 126; // 2026年
  t.tm_mon = 7;    // 8月
  t.tm_mday = 25;

  std::ostringstream oss;

  // ストリームのロケールからtime_putファセットを取得する
  const auto& facet = std::use_facet<std::time_put<char>>(oss.getloc());

  const char pattern[] = "%Y/%m/%d";
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', &t, pattern, pattern + 8);

  std::cout << oss.str() << std::endl;
}
```
* std::time_put[color ff0000]
* std::use_facet[link use_facet.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* facet.put[link time_put/put.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]
* std::tm[link /reference/ctime/tm.md]

#### 出力
```
2026/08/25
```

### ロケールによる違い
`%x`（日付）・`%A`（曜日名）・`%B`（月名）のように、Cロケールに依存すると規定されている書式指定子は、ストリームのロケールによって生成される文字列が変わる。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <ctime>
#include <string>
#include <stdexcept>

// 書式化の処理自体はロケールに依存しない
std::string format_time(const std::locale& loc, const std::tm& t, const std::string& pattern)
{
  std::ostringstream oss;
  oss.imbue(loc);

  const auto& facet = std::use_facet<std::time_put<char>>(oss.getloc());
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', &t,
            pattern.data(), pattern.data() + pattern.size());

  return oss.str();
}

int main()
{
  std::tm t{};
  t.tm_year = 126; // 2026年
  t.tm_mon = 7;    // 8月
  t.tm_mday = 25;
  t.tm_wday = 2;   // 火曜日

  for (const char* name : {"en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};

      std::cout << name << std::endl;
      std::cout << "  %x : " << format_time(loc, t, "%x") << std::endl;
      std::cout << "  %A : " << format_time(loc, t, "%A") << std::endl;
      std::cout << "  %B : " << format_time(loc, t, "%B") << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* std::time_put[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* oss.imbue[link /reference/ios/basic_ios/imbue.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]
* std::tm[link /reference/ctime/tm.md]

#### 出力例
```
en_US.UTF-8
  %x : 08/25/2026
  %A : Tuesday
  %B : August
ja_JP.UTF-8
  %x : 2026/08/25
  %A : 火曜日
  %B : 8月
de_DE.UTF-8
  %x : 25.08.2026
  %A : Dienstag
  %B : August
```

- `%x`が生成する日付の書式は、米国では月・日・年、日本では年・月・日、ドイツでは日・月・年の順となる。この順序は[`std::time_get::date_order()`](/reference/locale/time_get/date_order.md)で取得できる
- Cロケールに依存すると規定されている書式指定子について生成される文字列は、処理系定義である
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される



## バージョン
### 言語
- C++98


## 関連項目
- [`time_put_byname`](time_put_byname.md)
- [`time_get`](time_get.md)
- [`std::put_time`](/reference/iomanip/put_time.md)
- [`std::strftime`](/reference/ctime/strftime.md)
