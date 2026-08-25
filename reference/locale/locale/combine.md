# combine
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function template[meta id-type]

```cpp
template <class Facet>
locale combine(const locale& other) const; // (1) C++98
```

## 概要
別のロケールのファセットを組み込んだ新たな`locale`を構築する。

`*this`のすべてのファセットに加えて、`other`が持つ型`Facet`のファセットを組み込んだ`locale`を作成する。


## 戻り値
`*this`のコピーに対して、`other`が持つ型`Facet`のファセットを組み込んだ`locale`。


## 例外
[`has_facet`](../has_facet.md)`<Facet>(other)`が`false`の場合、[`std::runtime_error`](/reference/stdexcept.md)例外を送出する。


## 備考
この関数で構築された`locale`は名前を持たない（[`name`](name.md)`()`は`"*"`を返す）。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::locale c = std::locale::classic();
  std::locale jp("");

  // cロケールに、jpロケールのnumpunct<char>ファセットを組み込む
  std::locale combined = c.combine<std::numpunct<char>>(jp);

  std::cout << std::boolalpha;
  std::cout << (combined == c) << std::endl;
}
```
* combine[color ff0000]
* classic()[link classic.md]
* std::numpunct[link ../numpunct.md]

### 出力例
```
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`use_facet`](../use_facet.md)
- [`has_facet`](../has_facet.md)
- [`locale::(constructor)`](op_constructor.md)
