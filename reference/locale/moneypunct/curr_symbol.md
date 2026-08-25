# curr_symbol
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
string_type curr_symbol() const; // (1) C++98
```

## 概要
通貨記号を取得する。


## 戻り値
[`do_curr_symbol()`](do_curr_symbol.md)の呼び出し結果を返す。

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

      std::cout << name << " : [" << mp.curr_symbol() << "]" << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* curr_symbol[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.curr_symbol()[link /reference/locale/moneypunct/curr_symbol.md]

### 出力例
```
C : []
en_US.UTF-8 : [$]
ja_JP.UTF-8 : [￥]
de_DE.UTF-8 : [ €]
```

- ドイツのロケールの`" €"`のように、通貨記号自体が空白を含むことがある
- 記号を値の前後どちらに置くかは[`pos_format()`](pos_format.md)・[`neg_format()`](neg_format.md)のパターンで決まる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::do_curr_symbol`](do_curr_symbol.md)
