# operator->
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr const T* operator->() const noexcept;  // (1)
constexpr T* operator->() noexcept;              // (2)
```

## 概要
保持している正常値のメンバにアクセスする。


## 事前条件
[`has_value()`](has_value.md) `== true`


## 戻り値
正常値へのポインタ。


## 例外
投げない


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<std::string, int> x = "Hello";
  std::cout << x->size() << std::endl;

  std::expected<std::string, int> y = std::unexpected{42};
//std::cout << y->size() << std::endl;
  // エラー値を保持する y に対する operator-> 呼び出しは未定義動作
}
```
* x->[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator*`](op_deref.md)
- [`value()`](value.md)
- [`value_or()`](value_or.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
