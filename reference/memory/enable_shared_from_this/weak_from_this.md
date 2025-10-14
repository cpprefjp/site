# weak_from_this
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
weak_ptr<T>
  weak_from_this() noexcept;       // (1) C++17
constexpr weak_ptr<T>
  weak_from_this() noexcept;       // (1) C++26

weak_ptr<const T>
  weak_from_this() const noexcept; // (2) C++17
constexpr weak_ptr<const T>
  weak_from_this() const noexcept; // (2) C++26
```
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
`this`ポインタを`weak_ptr`に変換する。


## 要件
`*this`のインスタンスが[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして共有されていること。


## 戻り値
`this`ポインタを指す`weak_ptr`オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <memory>

struct X : public std::enable_shared_from_this<X> {
  std::weak_ptr<X> f()
  {
    // thisを指すweak_ptrオブジェクトを作る
    return weak_from_this();
  }
};

int main()
{
  std::shared_ptr<X> p(new X());
  std::weak_ptr<X> q = p->f();

  assert(p == q.lock());
}
```
* std::weak_ptr[link /reference/memory/weak_ptr.md]
* q.lock()[link /reference/memory/weak_ptr/lock.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Clang](/implementation.md#clang): 3.9 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0033R0 Re-enabling `shared_from_this`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0033r0.html)
- [P0033R1 Re-enabling `shared_from_this` (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0033r1.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)