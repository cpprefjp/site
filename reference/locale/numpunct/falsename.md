# falsename
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
string_type falsename() const; // (1) C++98
```

## 概要
`false`を表す文字列を取得する。


## 戻り値
[`do_falsename()`](do_falsename.md)の呼び出し結果を返す。

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
      const auto& np = std::use_facet<std::numpunct<char>>(loc);

      std::cout << name << " : [" << np.falsename() << "]" << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* falsename[color ff0000]
* std::numpunct[link /reference/locale/numpunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* np.falsename()[link /reference/locale/numpunct/falsename.md]

### 出力例
```
C : [false]
en_US.UTF-8 : [false]
ja_JP.UTF-8 : [false]
de_DE.UTF-8 : [false]
```

- この文字列は[`std::ios_base::boolalpha`](/reference/ios/ios_base/type-fmtflags.md)が設定されている場合の`bool`値の入出力で使用される
- 主要な処理系では、いずれのロケールでも`false`を表す英語の名前が返る
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::do_falsename`](do_falsename.md)
