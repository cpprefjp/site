# negative_sign
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
string_type negative_sign() const; // (1) C++98
```

## 概要
負の金額を表す記号を取得する。


## 戻り値
[`do_negative_sign()`](do_negative_sign.md)の呼び出し結果を返す。

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

      std::cout << name << " : [" << mp.negative_sign() << "]" << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* negative_sign[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.negative_sign()[link /reference/locale/moneypunct/negative_sign.md]

### 出力例
```
C : []
en_US.UTF-8 : [-]
ja_JP.UTF-8 : [-]
de_DE.UTF-8 : [-]
```

- `"()"`のように2文字以上の文字列を返すロケールもある。その場合、1文字目が符号の位置に置かれ、残りの文字は他のすべての書式要素の後ろに置かれる
- `"C"`ロケールにおける値は規格に規定がないため、処理系によって異なる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_negative_sign`](do_negative_sign.md)
