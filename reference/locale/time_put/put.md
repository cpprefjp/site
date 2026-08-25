# put
* locale[meta header]
* std[meta namespace]
* time_put[meta class]
* function[meta id-type]

```cpp
iter_type put(iter_type s, ios_base& str, char_type fill, const tm* t,
              const charT* pattern, const charT* pat_end) const;      // (1) C++98
iter_type put(iter_type s, ios_base& str, char_type fill, const tm* t,
              char format, char modifier = 0) const;                  // (2) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* tm[link /reference/ctime/tm.md]

## 概要
日時を書式化して、出力イテレータ`s`へ出力する。

- (1) : 範囲`[pattern, pat_end)`を書式文字列として、`*t`の内容を出力する
- (2) : 書式指定子`format`（と修飾子`modifier`）に従って`*t`の内容を出力する


## 効果
- (1) : `pattern`から`pat_end`までの列をたどり、書式シーケンスの一部である文字を識別する
    - 書式シーケンスに含まれない文字は、直ちに`s`へ書き込まれる
    - 書式シーケンスが識別されるたびに[`do_put`](do_put.md)が呼び出される。したがって書式要素とその他の文字は、パターンに現れた順に出力へ交互に現れる
    - 書式シーケンスの識別は、`str.`[`getloc()`](/reference/ios/ios_base/getloc.md)から取得した[`ctype`](/reference/locale/ctype.md)`<charT>`への参照`ct`を用いて、各文字`c`を`ct.`[`narrow`](/reference/locale/ctype/narrow.md)`(c, 0)`によって`char`へ変換して行われる
    - 各シーケンスの最初の文字は`'%'`であり、その後ろに省略可能な修飾子文字`mod`と、[`std::strftime`](/reference/ctime/strftime.md)で定義される書式指定子文字`spec`が続く。修飾子文字がない場合、`mod`は`0`である
    - 識別された妥当な書式シーケンスごとに、[`do_put`](do_put.md)`(s, str, fill, t, spec, mod)`を呼び出す
- (2) : [`do_put`](do_put.md)`(s, str, fill, t, format, modifier)`を呼び出す


## 戻り値
生成した最後の文字の直後を指すイテレータ。


## 備考
`fill`は、処理系定義の書式や派生クラスでの実装において使用できる。空白文字がこの引数の妥当な既定値である。


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
  t.tm_hour = 13;

  std::ostringstream oss;
  const auto& facet = std::use_facet<std::time_put<char>>(oss.getloc());

  // (1) 書式文字列を指定する
  const char pattern[] = "%Y-%m-%d";
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', &t, pattern, pattern + 8);

  oss << ' ';

  // (2) 単一の書式指定子を指定する
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', &t, 'H');

  std::cout << oss.str() << std::endl;
}
```
* std::time_put[link /reference/locale/time_put.md]
* put[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]
* std::tm[link /reference/ctime/tm.md]

#### 出力
```
2026-08-25 13
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
* put[color ff0000]
* std::time_put[link /reference/locale/time_put.md]
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
- [`time_put::do_put`](do_put.md)
- [`time_get`](/reference/locale/time_get.md)
- [`std::strftime`](/reference/ctime/strftime.md)
