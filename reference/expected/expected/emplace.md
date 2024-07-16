# emplace
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class... Args>
constexpr T& emplace(Args&&... args) noexcept;  // (1)

template<class U, class... Args>
constexpr T& emplace(initializer_list<U> il, Args&&... args) noexcept; // (2)
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : 正常値型`T`のコンストラクタ引数として任意個の引数を受け取って、型`T`のオブジェクトを正常値として生成し、保持する。
- (2) : 正常値型`T`のコンストラクタ引数として初期化子リストと任意個の引数を受け取って、型`T`のオブジェクトを正常値として生成し、保持する。


動作説明用の`expected`クラスメンバ変数として、下記を導入する。

- `val` : `T`型の正常値。
- `unex` : `E`型のエラー値。
- `has_val` : `bool`型のフラグ変数。正常値を保持する場合は`true`に、エラー値を保持する場合は`false`となる。


## テンプレートパラメータ制約
- (1) : [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<T, Args...> == true`
- (2) : [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<T,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`


## 効果
- (1) : 次の処理と等価
    ```cpp
    if (has_value()) {
      destroy_at(addressof(val));
    } else {
      destroy_at(addressof(unex));
      has_val = true;
    }
    return *construct_at(addressof(val), std::forward<Args>(args)...);
    ```
    * has_value[link has_value.md]
    * addressof[link /reference/memory/addressof.md]
    * construct_at[link /reference/memory/construct_at.md]
    * destroy_at[link /reference/memory/destroy_at.md]
    * std::forward[link /reference/utility/forward.md]

- (2) : 次の処理と等価
    ```cpp
    if (has_value()) {
      destroy_at(addressof(val));
    } else {
      destroy_at(addressof(unex));
      has_val = true;
    }
    return *construct_at(addressof(val), il, std::forward<Args>(args)...);
    ```
    * has_value[link has_value.md]
    * addressof[link /reference/memory/addressof.md]
    * construct_at[link /reference/memory/construct_at.md]
    * destroy_at[link /reference/memory/destroy_at.md]
    * std::forward[link /reference/utility/forward.md]


## 例
```cpp example
#include <cassert>
#include <expected>
#include <numeric>

// 引数リスト または 初期化子リスト＋引数リスト から例外送出なしに構築可能な型
struct ComplexType {
  int result = 0;

  ComplexType(int a, int b) noexcept
    : result(a + b) {}
  ComplexType(std::initializer_list<int> list, int init) noexcept
    : result(std::accumulate(list.begin(), list.end(), init)) {}
};

int main()
{
  // (1)
  {
    std::expected<ComplexType, int> x = std::unexpected{0};
    x.emplace(1, 2);
    assert(x.has_value());
    assert(x.value().result == 3);
  }

  // (2)
  {
    std::expected<ComplexType, int> x = std::unexpected{0};
    x.emplace({1, 2, 3, 4}, 5);
    assert(x.has_value());
    assert(x.value().result == 15);
  }
}
```
* emplace[color ff0000]
* has_value()[link has_value.md]
* value()[link value.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
