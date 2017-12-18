# category
* system_error[meta header]
* std[meta namespace]
* error_code[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const error_category& category() const noexcept;
```
* error_category[link ../error_category.md]

## 概要
包含しているエラーカテゴリへの参照を返す


## 戻り値
包含しているエラーカテゴリへの参照


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  const std::error_category& cat = ec.category();
  std::cout << cat.name() << std::endl;
}
```
* category()[color ff0000]
* std::errc::invalid_argument[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::error_category[link /reference/system_error/error_category.md]
* cat.name()[link /reference/system_error/error_category/name.md]

### 出力
```
generic
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
