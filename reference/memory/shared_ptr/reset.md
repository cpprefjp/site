# reset
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void
  reset() noexcept;             // (1) C++11
constexpr void
  reset() noexcept;             // (1) C++26

template <class Y>
void
  reset(Y* p);                  // (2) C++11
template <class Y>
constexpr void
  reset(Y* p);                  // (2) C++26

template <class Y,
          class Deleter>
void
  reset(Y* p,
        Deleter d);             // (3) C++11
template <class Y,
          class Deleter>
constexpr void
  reset(Y* p,
        Deleter d);             // (3) C++26

template <class Y,
          class Deleter,
          class Allocator>
void
  reset(Y* p,
        Deleter d,
        Allocator a);           // (4) C++11
template <class Y,
          class Deleter,
          class Allocator>
constexpr void
  reset(Y* p,
        Deleter d,
        Allocator a);           // (4) C++26
```

## 概要
リソースの所有権を放棄し、新たなリソースの所有権を設定する。


## 効果
- (1) : [`shared_ptr`](op_constructor.md)`().`[`swap`](swap.md)`(*this)`
- (2) : [`shared_ptr`](op_constructor.md)`(p).`[`swap`](swap.md)`(*this)`
- (3) : [`shared_ptr`](op_constructor.md)`(p, d).`[`swap`](swap.md)`(*this)`
- (4) : [`shared_ptr`](op_constructor.md)`(p, d, a).`[`swap`](swap.md)`(*this)`


## 戻り値
なし


## 例
```cpp example
#include <memory>

int main()
{
  std::shared_ptr<int> p1(new int(3));
  std::shared_ptr<int> q1 = p1;

  // (1)
  // p1が共有している所有権を放棄する。
  // q1がまだ所有権を持っているので、リソースは解放されない。
  p1.reset();

  std::shared_ptr<int> p2(new int(3));
  std::shared_ptr<int> q2 = p2;

  // (2)
  // p2が現在共有している所有権を放棄し、新たなリソースの所有権を設定する。
  // p2とq2がそれぞれ、異なるリソースを所有することになる。
  p2.reset(new int(2));
}
```
* reset[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)