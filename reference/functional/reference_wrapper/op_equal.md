# operator==
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function template[meta id-type]

```cpp
friend constexpr bool
  operator==(reference_wrapper x,
             reference_wrapper y);          // (1) C++26

friend constexpr bool
  operator==(reference_wrapper x,
             const T& y);                   // (2) C++26

friend constexpr bool
  operator==(reference_wrapper x,
             reference_wrapper<const T> y); // (3) C++26
```

## 概要
等値比較を行う。

- (1) : 同じ要素型の`reference_wrapper`同士を等値比較する
- (2) : `reference_wrapper`と要素型`T`を等値比較する
- (3) : `reference_wrapper<T>`と`reference_wrapper<const T>`を等値比較する

(2)と(3)はオペランドを左右で逆にしても使用できる。


## テンプレートパラメータ制約
- (1) : 式`x.`[`get()`](get.md) `== y.`[`get()`](get.md)が妥当であり、その戻り値型が`bool`に変換可能であること
- (2) : 式`x.`[`get()`](get.md) `== y`が妥当であり、その戻り値型が`bool`に変換可能であること
- (3) : 式`x.`[`get()`](get.md) `== y.`[`get()`](get.md)が妥当であり、その戻り値型が`bool`に変換可能であること


## 戻り値
- (1) :
    ```cpp
    return x.get() == y.get();
    ```
    * get()[link get.md]

- (2) :
    ```cpp
    return x.get() == y;
    ```
    * get()[link get.md]

- (3) :
    ```cpp
    return x.get() == y.get();
    ```
    * get()[link get.md]


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator!=`


## 例
```cpp example
#include <cassert>
#include <functional>

int main()
{
  int x = 3;
  int y = 3;

  assert(std::ref(x) == std::ref(y));

  assert(std::ref(x) == 3);
  assert(3 == std::ref(x));

  assert(std::ref(x) == std::cref(y));
  assert(std::cref(x) == std::ref(y));
}
```
* std::ref[link /reference/functional/ref.md]
* std::cref[link /reference/functional/cref.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]


## 参照
- [P2944R3 Comparisons for `reference_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2944r3.html)
