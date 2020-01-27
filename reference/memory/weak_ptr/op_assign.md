# operator=
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
weak_ptr& operator=(const weak_ptr& r) noexcept;      // (1)

template <class Y>
weak_ptr& operator=(const weak_ptr<Y>& r) noexcept;   // (2)

template <class Y>
weak_ptr& operator=(const shared_ptr<Y>& r) noexcept; // (3)

weak_ptr& operator=(weak_ptr&& r) noexcept;           // (4) C++14

template <class Y>
weak_ptr& operator=(weak_ptr<Y>&& r) noexcept;        // (5) C++14
```

## 概要
- (1) : `*this`の現在の監視を停�し、`r`の監視対象を新たに監視する。
- (2) : `*this`の現在の監視を停�し、変換可能な`weak_ptr`オブジェクト`r`の監視対象を新たに監視する。
- (3) : `*this`の現在の監視を停�し、新たに`r`を監視する。
- (4) : `*this`の現在の監視を停�し、`r`の監視対象を`*this`に移動する。
- (5) : `*this`の現在の監視を停�し、変換可能な`weak_ptr`オブジェクト`r`の監視対象を`*this`に移動する。


## 効果
- (1), (2), (3) : 以下と�価の効果を持つ。

```cpp
weak_ptr(r).swap(*this)
```
* weak_ptr[link op_constructor.md]
* swap[link swap.md]

- (4), (5) : 以下と�価の効果を持つ。

```cpp
weak_ptr(move(r)).swap(*this)
```
* weak_ptr[link op_constructor.md]
* move[link /reference/utility/move.md]
* swap[link swap.md]


## 戻り値
`*this`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <memory>

int main()
{
  // (1)
  // 他のweak_ptrオブジェクトの監視対象を、新たに監視する
  std::shared_ptr<int> sp1(new int(3));
  std::weak_ptr<int> wp1_org = sp1; // wp1_orgはsp1を監視する
  std::weak_ptr<int> wp1;
  wp1 = wp1_org; // wp1はwp1_orgの監視対象を監視する

  if (std::shared_ptr<int> r = wp1.lock()) {
    std::cout << *r << std::endl;
  }

  // (2)
  // 他の変換可能なweak_ptrオブジェクトの監視対象を、新たに監視する
  std::shared_ptr<int> sp2(new int(3));
  std::weak_ptr<int> wp2_org = sp2;
  std::weak_ptr<void> wp2;
  wp2 = wp2_org;

  if (std::shared_ptr<int> r = std::static_pointer_cast<int>(wp2.lock())) {
    std::cout << *r << std::endl;
  }

  // (3)
  // shared_ptrオブジェクトを新たに監視する
  std::shared_ptr<int> sp3(new int(3));
  std::weak_ptr<int> wp3;
  wp3 = sp3;

  if (std::shared_ptr<int> r = wp3.lock()) {
    std::cout << *r << std::endl;
  }

  // (4)
  // weak_ptrオブジェクトの監視対象を移動する
  std::shared_ptr<int> sp4(new int(3));
  std::weak_ptr<int> wp4_org = sp4;
  std::weak_ptr<int> wp4;
  wp4 = std::move(wp4_org);

  if (std::shared_ptr<int> r = wp4.lock()) {
    std::cout << *r << std::endl;
  }

  // (5)
  // 変換可能なweak_ptrオブジェクトの監視対象を移動する
  std::shared_ptr<int> sp5(new int(3));
  std::weak_ptr<int> wp5_org = sp5;
  std::weak_ptr<void> wp5;
  wp5 = std::move(wp5_org);

  if (std::shared_ptr<int> r = std::static_pointer_cast<int>(wp5.lock())) {
    std::cout << *r << std::endl;
  }
}
```
* lock()[link lock.md]
* std::static_pointer_cast[link /reference/memory/shared_ptr/static_pointer_cast.md]
* std::move[link /reference/utility/move.md]

### 出力
```
3
3
3
3
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [LWG Issue 2315. `weak_ptr` should be movable](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2315)
