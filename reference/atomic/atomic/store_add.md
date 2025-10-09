# store_add
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void
  store_add(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) noexcept;                               // (1) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
値を読み込まずに加算を行う。

この関数は、[`fetch_add()`](fetch_add.md)と異なり、現在の (古い) 値を読み込むことなく現在の値に演算を行うため、高速に動作する。ただし変更前の古い値は戻り値として取得できない。この関数はロックフリーに動作することが保証されているため、並列アルゴリズムで[`par_useq`](/reference/execution/execution/execution_policy.md)ポリシーを使う場合などに有用である。


## テンプレートパラメータ制約
- `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
- `order`は、以下のいずれかであること
    - [`memory_order_relaxed`](/reference/atomic/memory_order.md)
    - [`memory_order_release`](/reference/atomic/memory_order.md)
    - [`memory_order_seq_cst`](/reference/atomic/memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を加算した値でアトミックに置き換える


## 戻り値
なし


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型、ポインタに対する特殊化で定義される
- 整数型
    - 符号付き整数型に対しては、符号なし整数型に変換されたかのようにしたあと演算が行われ、結果は符号付き整数型になる。未定義動作はない
- 浮動小数点数型
    - 演算結果が、その型で表現できない値であった場合、結果は未規定値になる。ただしその操作によって未定義動作は起こらない
    - 浮動小数点数型に対する操作は[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<floating-point>`トレイトに準拠する
    - 浮動小数点数型に対するアトミック操作の浮動小数点環境は、呼び出しスレッドの浮動小数点環境とは異なる可能性がある
- ポインタ型
    - 結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない


## 例
### 基本的な使い方
```cpp example
#include <print>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  x.store_add(2);

  std::println("{}", x.load());
}
```
* store_add[color ff0000]
* x.load()[link load.md]


#### 出力
```
5
```

### 並列に加算する例
```cpp example
#include <print>
#include <atomic>
#include <algorithm>
#include <execution>

int main()
{
  std::atomic<int> x{0};
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::for_each(std::execution::par_unseq, v.begin(), v.end(), [&](int n){
    x.store_add(n);
  });

  std::println("{}", x.load());
}
```
* store_add[color ff0000]
* x.load()[link load.md]

#### 出力
```
15
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 13 [mark noimpl]


## 参照
- [P3111R8 Atomic Reduction Operations](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3111r8.html)