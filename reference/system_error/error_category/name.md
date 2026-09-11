# name
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
virtual const char* name() const noexcept = 0;
```

## 概要
カテゴリの名前を取得する


## 戻り値
エラーの分類を示す文字列を返す

- C++11 : 文字列のエンコーディングは未規定（実際には、各実装とも文字列リテラルで定義しており、通常の文字列リテラルのエンコーディングだった）
- C++29 : 文字列は、通常の文字列リテラルのエンコーディングであると規定された


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  const std::error_category& generic_cat = std::generic_category();
  std::cout << generic_cat.name() << std::endl;

  const std::error_category& system_cat = std::system_category();
  std::cout << system_cat.name() << std::endl;
}
```
* name()[color ff0000]
* std::generic_category()[link ../generic_category.md]
* std::system_category()[link ../system_category.md]

### 出力
```
generic
system
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]


## 参照
- [P3395R6 Fix encoding issues and add a `formatter` for `std::error_code`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3395r6.html)
    - C++29で、返される文字列のエンコーディングが規定された
- [LWG Issue 4156. `error_category` messages have unspecified encoding](https://cplusplus.github.io/LWG/issue4156)
    - エンコーディングが未規定であることを指摘したissue。P3395R6で解決された
