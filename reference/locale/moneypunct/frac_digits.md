# frac_digits
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
int frac_digits() const; // (1) C++98
```

## 概要
金額の小数桁数を取得する。


## 戻り値
[`do_frac_digits()`](do_frac_digits.md)の呼び出し結果を返す。


## 例
```cpp example
#include <iostream>
#include <locale>
#include <stdexcept>

int main()
{
  for (const char* name : {"C", "en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};
      const auto& mp = std::use_facet<std::moneypunct<char>>(loc);

      std::cout << name << " : " << mp.frac_digits() << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* frac_digits[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.frac_digits()[link /reference/locale/moneypunct/frac_digits.md]

### 出力例
```
C : 0
en_US.UTF-8 : 2
ja_JP.UTF-8 : 0
de_DE.UTF-8 : 2
```

- 日本円は補助単位を持たないため`0`であり、米ドルとユーロはセントを持つため`2`となる
- この値は、金額の入出力で扱う整数値が最小単位のいくつ分にあたるかを決める。`2`の場合、`105623`は`1056.23`として表示される
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_frac_digits`](do_frac_digits.md)
- [`moneypunct::decimal_point`](decimal_point.md)
