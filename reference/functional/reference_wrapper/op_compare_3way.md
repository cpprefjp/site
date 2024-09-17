# operator<=>
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function template[meta id-type]

```cpp
friend constexpr synth-three-way-result<T>
  operator<=>(reference_wrapper x,
              reference_wrapper y);          // (1) C++26

friend constexpr synth-three-way-result<T>
  operator<=>(reference_wrapper x,
              const T& y);                   // (2) C++26

friend constexpr synth-three-way-result<T>
  operator<=>(reference_wrapper x,
              reference_wrapper<const T> y); // (3) C++26
```

## 概要
三方比較を行う。

- (1) : 同じ要素型の`reference_wrapper`同士を三方比較する
- (2) : `reference_wrapper`と要素型`T`を三方比較する
- (3) : `reference_wrapper<T>`と`reference_wrapper<const T>`を三方比較する

(2)と(3)はオペランドを左右で逆にしても使用できる。


## テンプレートパラメータ制約
- (3) : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 戻り値
- (1) :
    ```cpp
    return synth-three-way(x.get(), y.get());
    ```
    * get()[link get.md]

- (2) :
    ```cpp
    return synth-three-way(x.get(), y);
    ```
    * get()[link get.md]

- (3) :
    ```cpp
    return synth-three-way(x.get(), y.get());
    ```
    * get()[link get.md]


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <compare>
#include <functional>

int main()
{
  int x = 3;
  int y = 3;
  int z = 4;

  assert((std::ref(x) <=> std::ref(y)) == 0);
  assert(std::ref(x) < std::ref(z));
  assert(std::ref(x) <= std::ref(z));
  assert(std::ref(z) > std::ref(x));
  assert(std::ref(z) >= std::ref(x));

  assert((std::ref(x) <=> 3) == 0);
  assert((3 <=> std::ref(x)) == 0);

  assert((std::ref(x) <=> std::cref(y)) == 0);
  assert((std::cref(x) <=> std::ref(y)) == 0);
}
```

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]


## 参照
- [P2944R3 Comparisons for `reference_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2944r3.html)
