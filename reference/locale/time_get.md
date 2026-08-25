# time_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class time_get : public locale::facet, public time_base;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]
* time_base[link /reference/locale/time_base.md]

## 概要
`time_get`は、文字列を解析して日時の要素を[`std::tm`](/reference/ctime/tm.md)オブジェクトへ取り出すためのロケールファセットである。

各`get`メンバ関数は、[`time_put::put`](/reference/locale/time_put/put.md)の対応する書式指定子が生成する書式を解析する。解析対象の列が正しい書式に一致した場合、`tm`引数の対応するメンバにはその列を生成した値が設定される。そうでない場合は、エラーが報告されるか、未規定の値が代入される。

いずれかの`get()`メンバ関数の解析中に終端イテレータへ到達した場合、`err`に[`std::ios_base::eofbit`](/reference/ios/ios_base/type-iostate.md)が設定される。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|-----------------------------------|---|
| [`(constructor)`](time_get/op_constructor.md) | コンストラクタ | |
| [`date_order`](time_get/date_order.md) | 日付の表記順を取得する | |
| [`get_time`](time_get/get_time.md) | 時間の解析 | |
| [`get_date`](time_get/get_date.md) | 日付の解析 | |
| [`get_weekday`](time_get/get_weekday.md) | 曜日の解析 | |
| [`get_monthname`](time_get/get_monthname.md) | 月名の解析 | |
| [`get_year`](time_get/get_year.md) | 年の解析 | |
| [`get`](time_get/get.md) | 日時の解析 | C++11 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------|-----------------------------------|---|
| [`(destructor)`](time_get/op_destructor.md) | デストラクタ | |
| [`do_date_order`](time_get/do_date_order.md) | 日付の表記順を取得する (virtual) | |
| [`do_get_time`](time_get/do_get_time.md) | 時間の解析 (virtual) | |
| [`do_get_date`](time_get/do_get_date.md) | 日付の解析 (virtual) | |
| [`do_get_weekday`](time_get/do_get_weekday.md) | 曜日の解析 (virtual) | |
| [`do_get_monthname`](time_get/do_get_monthname.md) | 月名の解析 (virtual) | |
| [`do_get_year`](time_get/do_get_year.md) | 年の解析 (virtual) | |
| [`do_get`](time_get/do_get.md) | 日時の解析 (virtual) | C++11 |

## メンバ型

| 名前 | 説明 |
|-----------------------------------------------------------------------|---------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |

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
  std::istringstream iss{"2026-08-25"};

  // ストリームのロケールからtime_getファセットを取得する
  const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

  std::tm t{};
  std::ios_base::iostate err = std::ios_base::goodbit;

  const char fmt[] = "%Y-%m-%d";
  facet.get(std::istreambuf_iterator<char>{iss},
            std::istreambuf_iterator<char>{},
            iss, err, &t, fmt, fmt + 8);

  // tm_yearは1900年からの経過年数、tm_monは1月を0とする月番号
  std::cout << t.tm_year << ' ' << t.tm_mon << ' ' << t.tm_mday << std::endl;
}
```
* std::time_get[color ff0000]
* std::use_facet[link use_facet.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* facet.get[link time_get/get.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]
* std::tm[link /reference/ctime/tm.md]

#### 出力
```
126 7 25
```

### ロケールによる違い
`%x`（日付）のようにCロケールに依存すると規定されている書式指定子は、ストリームのロケールによって解析される書式が変わる。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <ctime>
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
  const char* names[] = {"en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"};

  // 各ロケールの%xの書式で書かれた、同じ日付
  const char* texts[] = {"08/25/2026", "2026/08/25", "25.08.2026"};

  for (int i = 0; i < 3; ++i) {
    try {
      std::istringstream iss{texts[i]};
      iss.imbue(std::locale{names[i]});

      const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

      std::tm t{};
      std::ios_base::iostate err = std::ios_base::goodbit;

      const char fmt[] = "%x";
      facet.get(std::istreambuf_iterator<char>{iss},
                std::istreambuf_iterator<char>{},
                iss, err, &t, fmt, fmt + 2);

      std::cout << names[i] << std::endl;
      std::cout << "  date_order : " << to_string(facet.date_order()) << std::endl;
      std::cout << "  " << texts[i] << " -> "
                << (t.tm_year + 1900) << '/' << (t.tm_mon + 1) << '/' << t.tm_mday
                << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << names[i] << " : not available" << std::endl;
    }
  }
}
```
* std::time_get[color ff0000]
* facet.get[link time_get/get.md]
* facet.date_order()[link time_get/date_order.md]
* std::time_base::no_order[link /reference/locale/time_base.md]
* std::time_base::dmy[link /reference/locale/time_base.md]
* std::time_base::mdy[link /reference/locale/time_base.md]
* std::time_base::ymd[link /reference/locale/time_base.md]
* std::time_base::ydm[link /reference/locale/time_base.md]
* std::time_base::dateorder[link /reference/locale/time_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* iss.imbue[link /reference/ios/basic_ios/imbue.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]
* std::tm[link /reference/ctime/tm.md]

#### 出力例
```
en_US.UTF-8
  date_order : mdy
  08/25/2026 -> 2026/8/25
ja_JP.UTF-8
  date_order : ymd
  2026/08/25 -> 2026/8/25
de_DE.UTF-8
  date_order : dmy
  25.08.2026 -> 2026/8/25
```

- 書かれ方が異なる3つの日付文字列が、いずれも同じ日付として解析される
- 各ロケールにおける日付の要素の並び順は[`date_order()`](time_get/date_order.md)で取得できる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される



## バージョン
### 言語
- C++98


## 関連項目
- [`time_get_byname`](time_get_byname.md)
- [`time_base`](time_base.md)
- [`time_put`](time_put.md)
- [`locale`](locale.md)
