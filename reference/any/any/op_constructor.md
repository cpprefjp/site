# コンストラクタ
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr any() noexcept;                  // (1)
any(const any& other);                     // (2)
any(any&& other) noexcept;                 // (3)

template <class T>
any(T&& value);                            // (4)

template <class T, class... Args>
explicit any(in_place_type_t<T>,
             Args&&... args);              // (5)

template <class T, class U, class... Args>
explicit any(in_place_type_t<T>,
             initializer_list<U> il,
             Args&&... args);              // (6)
```
* in_place_type_t[link /reference/utility/in_place_type_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : 値を保持していない状態にする
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : 任意の型`T`の値`value`を`*this`にムーブして保持する
- (5) : 任意の型`T`のコンストラクタ引数`args...`をとり、コンストラクタ内部で`T`型オブジェクトを構築して保持する
- (6) : 任意の型`T`のコンストラクタ引数`il`と`args...`をとり、コンストラクタ内部で`T`型オブジェクトを構築して保持する


## テンプレートパラメータ制約
- (4) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<`[`std::decay_t`](/reference/type_traits/decay.md)`<T>> == true`であること
- (5) : `using VT =` [`std::decay_t<T>`](/reference/type_traits/decay.md)であるとして、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<VT> == true`かつ[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT, Args...> == true`であること
- (6) : `using VT =` [`std::decay_t<T>`](/reference/type_traits/decay.md)であるとして、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<VT> == true`かつ[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT,` [`std::initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`であること


## 効果
- (2) : `other.`[`has_value()`](has_value.md) `== false`である場合、値を保持しない`any`オブジェクトを構築する。そうでなければ、`any(`[`in_place`](/reference/utility/in_place_t.md)`<T>,` [`any_cast`](/reference/any/any_cast.md)`<const T&>(other))`と等価の効果をもつ
- (3) : `other.`[`has_value()`](has_value.md) `== false`である場合、値を保持しない`any`オブジェクトを構築する。そうでなければ、`other`が保持する値を`this`にムーブする
- (4) : [`std::forward`](/reference/utility/forward.md)`<T>(value)`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する
- (5) : [`std::forward`](/reference/utility/forward.md)`<Args>(value)...`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する
- (6) : `il`と[`std::forward`](/reference/utility/forward.md)`<Args>(value)...`をコンストラクタ引数として、型[`std::decay_t<T>`](/reference/type_traits/decay.md)のオブジェクトを直接構築して保持する


## 事後条件
- (1) : [`has_value()`](has_value.md) `== false`となる
- (3) : `other`は有効だが未規定の状態となる


## 例外
- (2) : `other`が保持する型`T`のオブジェクトの選択されたコンストラクタが、任意の例外を送出する可能性がある
- (4), (5), (6) : 型[`std::decay_t<T>`](/reference/type_traits/decay.md)の選択されたコンストラクタが、任意の例外を送出する可能性がある


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
    std::any x;
    assert(!x.has_value());
  }

  // (2)
  {
    std::any a = 3;
    std::any b = a;

    assert(std::any_cast<int>(a) == 3);
    assert(std::any_cast<int>(b) == 3);
  }

  // (3)
  {
    std::any a = std::string("Hello");
    std::any b = std::move(a);

    assert(std::any_cast<std::string>(b) == "Hello");
  }

  // (4)
  {
    std::any a = 3;
    std::any b = std::string("Hello");

    assert(std::any_cast<int>(a) == 3);
    assert(std::any_cast<std::string>(b) == "Hello");
  }

  // (5)
  {
    std::any x {
      std::in_place_type<std::string>,
      3,
      'z'
    };

    assert(std::any_cast<std::string>(x) == "zzz");
  }

  // (6)
  {
    std::allocator<int> alloc;
    std::any x {
      std::in_place_type<std::vector<int>>,
      {3, 1, 4},
      alloc
    };

    const auto& vec = std::any_cast<const std::vector<int>&>(x);
    assert(vec[0] == 3);
    assert(vec[1] == 1);
    assert(vec[2] == 4);
  }
}
```
* x.has_value()[link has_value.md]
* std::any_cast[link /reference/any/any_cast.md]
* std::move[link /reference/utility/move.md]
* std::in_place_type[link /reference/utility/in_place_type_t.md]

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
