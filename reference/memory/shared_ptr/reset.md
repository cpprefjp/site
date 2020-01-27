# reset
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reset() noexcept;                              // (1)

template <class Y>
void reset(Y* p);                                   // (2)

template <class Y, class Deleter>
void reset(Y* p, Deleter d);                        // (3)

template <class Y, class Deleter, class Allocator>
void reset(Y* p, Deleter d, Allocator a);           // (4)
```

## 概要
リソースの所有権を放棄し、新たなリソースの所有権を�定する。


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
  // p2が現在共有している所有権を放棄し、新たなリソースの所有権を�定する。
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
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
