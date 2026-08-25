# get_year
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
iter_type get_year(iter_type s, iter_type end, ios_base& str,
                  ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
入力イテレータ範囲`[s, end)`から年を解析する。解析結果は`*t`の対応するメンバへ格納される。


## 戻り値
[`do_get_year(s, end, str, err, t)`](do_get_year.md)


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <ctime>
#include <stdexcept>

int main()
{
  const char* names[] = {"C", "en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"};

  for (int i = 0; i < 4; ++i) {
    try {
      std::istringstream iss{"2026"};
      iss.imbue(std::locale{names[i]});

      const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

      std::tm t{};
      std::ios_base::iostate err = std::ios_base::goodbit;

      facet.get_year(std::istreambuf_iterator<char>{iss},
                     std::istreambuf_iterator<char>{},
                     iss, err, &t);

      std::cout << names[i] << " : 2026 -> " << t.tm_year << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << names[i] << " : not available" << std::endl;
    }
  }
}
```
* get_year[color ff0000]
* std::time_get[link /reference/locale/time_get.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* iss.imbue[link /reference/ios/basic_ios/imbue.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]
* std::tm[link /reference/ctime/tm.md]

### 出力例
```
C : 2026 -> 126
en_US.UTF-8 : 2026 -> 126
ja_JP.UTF-8 : 2026 -> 126
de_DE.UTF-8 : 2026 -> 126
```

- `tm_year`には1900年からの経過年数が設定される
- 年の表記はロケールによらず数字であるため、いずれのロケールでも同じ結果となる
- 2桁の年を受け付けるかどうか、受け付ける場合にどの世紀にあると仮定するかは処理系定義である
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::do_get_year`](do_get_year.md)
- [`time_put`](/reference/locale/time_put.md)
