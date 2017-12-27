# getloc
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
locale_type getloc() const;
```

## 概要
現在のロケールを取得する。


## 効果
`*this` に保持されている `traits_type` 型のオブジェクト `traits_inst` に対して、`traits_inst.getloc()` を呼び出し、その結果を返す。


## 戻り値
現在設定されているロケール


## 備考
- `traits_inst` はデフォルト初期化されたオブジェクトである。
- `locale_type` は、ロケールに関する型であり、`traits_type::locale_type` の別名である。
- `traits_type` は、クラステンプレート [`basic_regex`](../basic_regex.md) の 2 番目のテンプレート引数で、デフォルトでは [`regex_traits`](../regex_traits.md)`<char_type>` である。  
    その場合、`locale_type` は [`locale`](../../locale/locale.md) である。


## 例
```cpp example
#include <iostream>
#include <locale>
#include <regex>

int main()
{
  std::regex re("\\w+");
  auto loc = re.getloc();
  std::cout << std::boolalpha << (loc == std::locale()) << std::endl;
}
```
* getloc()[color ff0000]
* std::locale[link /reference/locale/locale.md]

### 出力
```
true
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
