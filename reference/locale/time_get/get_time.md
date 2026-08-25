# get_time
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
iter_type get_time(iter_type s, iter_type end, ios_base& str,
                  ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
入力イテレータ範囲`[s, end)`から時刻を解析する。解析結果は`*t`の対応するメンバへ格納される。


## 戻り値
[`do_get_time(s, end, str, err, t)`](do_get_time.md)


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
      std::istringstream iss{"13:05:30"};
      iss.imbue(std::locale{names[i]});

      const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

      std::tm t{};
      std::ios_base::iostate err = std::ios_base::goodbit;

      facet.get_time(std::istreambuf_iterator<char>{iss},
                     std::istreambuf_iterator<char>{},
                     iss, err, &t);

      std::cout << names[i] << " : 13:05:30 -> " << t.tm_hour << ':' << t.tm_min << ':' << t.tm_sec << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << names[i] << " : not available" << std::endl;
    }
  }
}
```
* get_time[color ff0000]
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
C : 13:05:30 -> 13:5:30
en_US.UTF-8 : 13:05:30 -> 13:5:30
ja_JP.UTF-8 : 13:05:30 -> 13:5:30
de_DE.UTF-8 : 13:05:30 -> 13:5:30
```

- 時刻の書式は規格により`"%H:%M:%S"`と定められているため、いずれのロケールでも同じ結果となる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::do_get_time`](do_get_time.md)
- [`time_put`](/reference/locale/time_put.md)
