# name
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const char* name() const noexcept;
```

## 概要
カテゴリの名前を取得する


## 戻り値
エラーの分類を示す文字列を返す


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
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
