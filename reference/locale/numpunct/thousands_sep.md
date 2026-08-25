# thousands_sep
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
char_type thousands_sep() const; // (1) C++98
```

## 概要
桁区切りの文字を取得する。


## 戻り値
[`do_thousands_sep()`](do_thousands_sep.md)の呼び出し結果を返す。

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

      std::cout << name << " : [" << np.thousands_sep() << "]" << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* thousands_sep[color ff0000]
* std::numpunct[link /reference/locale/numpunct.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* np.thousands_sep()[link /reference/locale/numpunct/thousands_sep.md]

### 出力例
```
C : [,]
en_US.UTF-8 : [,]
ja_JP.UTF-8 : [,]
de_DE.UTF-8 : [.]
```

- ドイツのロケールでは桁区切りにピリオドが使われる
- 桁区切りが実際に使用されるかどうかは[`grouping()`](grouping.md)が返す値による
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::do_thousands_sep`](do_thousands_sep.md)
