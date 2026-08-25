# get
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iter_type
  get(iter_type s,
      iter_type end,
      ios_base& f,
      ios_base::iostate& err,
      tm* t,
      char format,
      char modifier = 0) const;       // (1) C++11

iter_type
  get(iter_type s,
      iter_type end,
      ios_base& f,
      ios_base::iostate& err,
      tm* t,
      const char_type* fmt,
      const char_type* fmtend) const; // (2) C++11
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
入力イテレータ範囲`[s, end)`から、書式を指定して日時を解析する。

- (1) : 単一の書式指定子`format`（と修飾子`modifier`）に従って解析する
- (2) : 範囲`[fmt, fmtend)`を書式文字列として解析する


## 事前条件
- (2) : `[fmt, fmtend)`が妥当な範囲であること


## 効果
- (2) : `err = `[`std::ios_base::goodbit`](/reference/ios/ios_base/type-iostate.md)を評価したのち、各反復で`s`から0個以上の文字を読み取るループに入る。ループは以下のいずれかが最初に成立したときに終了する
    - `fmt == fmtend`が`true`である
    - `err == `[`std::ios_base::goodbit`](/reference/ios/ios_base/type-iostate.md)が`false`である
    - `s == end`が`true`である。この場合、`err = `[`std::ios_base::eofbit`](/reference/ios/ios_base/type-iostate.md)` | `[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を評価する
    - `fmt`の次の要素が`'%'`であり、省略可能な修飾子文字と変換指定子文字`format`が続いて、POSIX関数`strptime`にとって妥当な変換指定を形成する場合。範囲`[fmt, fmtend)`の要素数が、変換指定が完全かつ妥当であるかを曖昧さなく判定するのに不足している場合は`err = `[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を評価する。そうでない場合は`s = `[`do_get`](do_get.md)`(s, end, f, err, t, format, modifier)`を評価する（修飾子がない場合、`modifier`の値は`'\0'`である）。評価後に`err == `[`std::ios_base::goodbit`](/reference/ios/ios_base/type-iostate.md)であれば、`fmt`を変換指定の終端の直後まで進めてループを継続する
    - `isspace(*fmt, f.`[`getloc()`](/reference/ios/ios_base/getloc.md)`)`が`true`である場合。この場合、まず`fmt == fmtend || !isspace(*fmt, f.getloc())`が`true`になるまで`fmt`を進め、次に`s == end || !isspace(*s, f.getloc())`が`true`になるまで`s`を進めて、ループを再開する
    - `s`から読み取った次の文字が、`fmt`が指す要素と大文字小文字を区別しない比較で一致する場合。この場合`++fmt, ++s`を評価してループを継続する。一致しない場合は`err = `[`std::ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)を評価する


## 戻り値
- (1) : [`do_get(s, end, f, err, t, format, modifier)`](do_get.md)
- (2) : `s`


## 備考
- (2) : 妥当な空白文字の判定には、`f`のロケールに設定された[`ctype`](/reference/locale/ctype.md)`<charT>`ファセットが使用される。大文字小文字を区別しない比較をどのような手段で行うか、およびその際に複数文字の並びを考慮するかは未規定である


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
  const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

  std::tm t{};
  std::ios_base::iostate err = std::ios_base::goodbit;

  // (2) 書式文字列を指定する
  const char fmt[] = "%Y-%m-%d";
  facet.get(std::istreambuf_iterator<char>{iss},
            std::istreambuf_iterator<char>{},
            iss, err, &t, fmt, fmt + 8);

  std::cout << t.tm_year << ' ' << t.tm_mon << ' ' << t.tm_mday << std::endl;
}
```
* get[color ff0000]
* std::time_get[link /reference/locale/time_get.md]
* std::use_facet[link /reference/locale/use_facet.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
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
* get[color ff0000]
* std::time_get[link /reference/locale/time_get.md]
* facet.date_order()[link date_order.md]
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
- 各ロケールにおける日付の要素の並び順は[`date_order()`](date_order.md)で取得できる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++11


## 関連項目
- [`time_get::do_get`](do_get.md)
- [`time_put::put`](/reference/locale/time_put/put.md)
