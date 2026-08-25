# get_monthname
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
iter_type get_monthname(iter_type s, iter_type end, ios_base& str,
                       ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
入力イテレータ範囲`[s, end)`から月名を解析する。解析結果は`*t`の対応するメンバへ格納される。


## 戻り値
[`do_get_monthname(s, end, str, err, t)`](do_get_monthname.md)


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

  // 各ロケールでの月名
  const char* texts[] = {"August", "August", "8月", "August"};

  for (int i = 0; i < 4; ++i) {
    try {
      std::istringstream iss{texts[i]};
      iss.imbue(std::locale{names[i]});

      const auto& facet = std::use_facet<std::time_get<char>>(iss.getloc());

      std::tm t{};
      std::ios_base::iostate err = std::ios_base::goodbit;

      facet.get_monthname(std::istreambuf_iterator<char>{iss},
                          std::istreambuf_iterator<char>{},
                          iss, err, &t);

      std::cout << names[i] << " : " << texts[i] << " -> " << t.tm_mon << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << names[i] << " : not available" << std::endl;
    }
  }
}
```
* get_monthname[color ff0000]
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
C : August -> 7
en_US.UTF-8 : August -> 7
ja_JP.UTF-8 : 8月 -> 7
de_DE.UTF-8 : August -> 7
```

- ロケールごとに異なる月名を解析しても、`tm_mon`には同じ値（1月を`0`とする月番号）が設定される
- 省略形（`Aug`など）も解析できる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::do_get_monthname`](do_get_monthname.md)
- [`time_put`](/reference/locale/time_put.md)
