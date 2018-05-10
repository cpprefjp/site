# operator=
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_ptr& operator=(const shared_ptr& r) noexcept;    // (1)

template <class Y>
shared_ptr& operator=(const shared_ptr<Y>& r) noexcept; // (2)

shared_ptr& operator=(shared_ptr&& r) noexcept;         // (3)

template <class Y>
shared_ptr& operator=(shared_ptr<Y>&& r) noexcept;      // (4)

template <class Y>
shared_ptr& operator=(auto_ptr<Y>&& r);                 // (5)
                                                        // C++11から非推奨
                                                        // C++17で削除

template <class Y, class D>
shared_ptr& operator=(unique_ptr<Y, D>&& r);            // (6)
```
* unique_ptr[link /reference/memory/unique_ptr.md]

## 概要
- (1), (2) : 自身が保持しているリソースの所有権を放棄し、`r`が持つリソースの所有権を共有する。
- (3), (4), (5), (6) : 自身が保持しているリソースの所有権を放棄し、`r`が持つリソースの所有権を`*this`に移動する。


## 効果
- (1), (2) : [`shared_ptr`](op_constructor.md)`(r).`[`swap`](swap.md)`(*this)`
- (3), (4) : [`shared_ptr`](op_constructor.md)`(std::`[`move`](/reference/utility/move.md)`(r)).`[`swap`](swap.md)`(*this)`
- (5) : [`shared_ptr`](op_constructor.md)`(r).`[`swap`](swap.md)`(*this)`
- (6) : [`shared_ptr`](op_constructor.md)`(std::`[`move`](/reference/utility/move.md)`(r)).`[`swap`](swap.md)`(*this)`


## 戻り値
`*this`


## 例外
- (1) : 投げない
- (2) : 投げない
- (3) : 投げない
- (4) : 投げない


## 例
```cpp example
#include <cassert>
#include <memory>

int main()
{
  // (1)
  // 自身の所有権を放棄し、
  // 他のshared_ptrオブジェクトとリソースを共有する。
  {
    std::shared_ptr<int> p(new int(3));
    std::shared_ptr<int> q;
    q = p;

    assert(*p.get() == 3);
    assert(p.use_count() == 2);

    assert(*q.get() == 3);
    assert(q.use_count() == 2);
  }

  // (2)
  // 自身の所有権を放棄し、
  // 変換可能なshared_ptrオブジェクトとリソースを共有する。
  {
    std::shared_ptr<int> p(new int(3));
    std::shared_ptr<void> q;
    q = p;

    assert(*p.get() == 3);
    assert(p.use_count() == 2);

    assert(*static_cast<int*>(q.get()) == 3);
    assert(q.use_count() == 2);
  }

  // (3)
  // 自身の所有権を放棄し、
  // 他のshared_ptrから所有権を移動する
  {
    std::shared_ptr<int> p(new int(3));
    std::shared_ptr<int> q;
    q = std::move(p);

    // 移動元は空の状態になる
    assert(p.get() == nullptr);
    assert(p.use_count() == 0);

    assert(*q.get() == 3);
    assert(q.use_count() == 1);
  }

  // (6)
  // 自身の所有権を放棄し、
  // unique_ptrオブジェクトから所有権を移動する
  {
    std::unique_ptr<int> p(new int(3));
    std::shared_ptr<int> q;
    q = std::move(p);

    // 移動元は空の状態になる
    assert(p.get() == nullptr);

    assert(*q.get() == 3);
    assert(q.use_count() == 1);
  }
}
```
* std::move[link /reference/utility/move.md]
* p.get()[link get.md]
* p.use_count()[link use_count.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6(unique_ptr以外), 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
	- 2008は(1), (2), (5)変形のみ
	- 2008, 2010の(5)は、仮引数の型が`auto_ptr<Y>&&`ではなく`auto_ptr<Y>&`になっている。


## 参照
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
