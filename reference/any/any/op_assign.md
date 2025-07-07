# operator=
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
any& operator=(const any& rhs);     // (1)
any& operator=(any&& rhs) noexcept; // (2)

template <class T>
any& operator=(T&& rhs);            // (3)
```

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 任意の型の値を代入


## テンプレートパラメータ制約
- (3) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<`[`std::decay_t`](/reference/type_traits/decay.md)`<T>> == true`であること


## 効果
- (1) : `any(rhs).`[`swap`](swap.md)`(*this)`と等価。この効果自体では例外を送出しない
- (2) : `any(`[`std::move`](/reference/utility/move.md)`(rhs)).`[`swap`](swap.md)`(*this)`と等価。この効果自体では例外を送出しない。`*this`の状態は、この関数を呼び出す前の`rhs`と等価の状態となり、`rhs`は有効だが未規定の状態を持つようになる
- (3) : [`std::forward`](/reference/utility/forward.md)`<T>(value)`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する`any`オブジェクト`tmp`を構築し、`tmp.`[`swap`](swap.md)`(*this)`する。この効果自体では例外を送出しない


## 戻り値
- (1), (2), (3) : `*this`


## 例外
- (1) : 保持するオブジェクトのコピーコンストラクタが任意の例外を送出する可能性がある
- (3) : 型[`std::decay_t<T>`](/reference/type_traits/decay.md)の選択されたコンストラクタが、任意の例外を送出する可能性がある


## 例
```cpp example
#include <any>
#include <string>
#include <vector>
#include <cassert>

int main()
{
  // (1)
  {
    std::any a = 3;
    std::any b;

    b = a;

    assert(std::any_cast<int>(a) == 3);
    assert(std::any_cast<int>(b) == 3);
  }

  // (2)
  {
    std::any a = std::string("Hello");
    std::any b;

    b = std::move(a);

    assert(std::any_cast<std::string>(b) == "Hello");
  }

  // (3)
  {
    std::any a, b;

    a = 3;
    b = std::string("Hello");

    assert(std::any_cast<int>(a) == 3);
    assert(std::any_cast<std::string>(b) == "Hello");
  }
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
