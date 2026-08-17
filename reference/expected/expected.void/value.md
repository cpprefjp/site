# value
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr void value() const &; // (1)
constexpr void value() &&;      // (2)
```

## 概要
正常値(`void`)を取得する。


## 適格要件
- (1) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true`であること
- (2) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true`かつ[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`であること


## 戻り値
なし



## 備考
この関数は、例外を送出しうるため、フリースタンディング処理系では削除される（フリースタンディング処理系では使用できない）。

## 例外
- (1) : エラー値を保持していたら、例外[`bad_expected_access`](../bad_expected_access.md)`(`[`error()`](error.md)`)`を送出する
- (2) : エラー値を保持していたら、例外[`bad_expected_access`](../bad_expected_access.md)`(`[`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))`を送出する


## 例
```cpp example
#include <expected>
#include <iostream>

int main()
{
  std::expected<void, int> x;
  x.value();

  std::expected<void, int> y = std::unexpected{42};
  try {
    y.value();
  } catch (const std::bad_expected_access<int>& ex) {
    std::cout << "throw:" << ex.error() << std::endl;
  }
}
```
* value()[color ff0000]
* error()[link ../bad_expected_access/error.md]
* std::unexpected[link ../unexpected.md]
* std::bad_expected_access[link ../bad_expected_access.md]

### 出力
```
throw:42
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


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [LWG Issue 3940. `std::expected<void, E>::value()` also needs `E` to be copy constructible](https://cplusplus.github.io/LWG/issue3940)
    - C++26で、(1)に`E`がコピー構築可能であること、(2)に`E`がコピー構築可能かつムーブ構築可能であることを要求する適格要件が追加された
