# grouping
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
string grouping() const; // (1) C++98
```
* string[link /reference/string/basic_string.md]

## 概要
何桁で区切るかの、桁数のシーケンスを取得する。


## 戻り値
[`do_grouping()`](do_grouping.md)の呼び出し結果を返す。

## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>
#include <stdexcept>

int main()
{
  for (const char* name : {"C", "en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      std::locale loc{name};
      const auto& mp = std::use_facet<std::moneypunct<char>>(loc);

      std::string g = mp.grouping();

      if (g.empty()) {
        std::cout << name << " : (no grouping)" << std::endl;
      }
      else {
        // 各要素は文字ではなく桁数を表す数値である
        std::cout << name << " : " << static_cast<int>(g[0]) << std::endl;
      }
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* grouping[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.grouping()[link /reference/locale/moneypunct/grouping.md]

### 出力例
```
C : (no grouping)
en_US.UTF-8 : 3
ja_JP.UTF-8 : 3
de_DE.UTF-8 : 3
```

- 戻り値の各要素は文字ではなく数値として解釈される。3桁ごとの区切りは`'3'`（文字）ではなく`3`（数値）である
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_grouping`](do_grouping.md)
