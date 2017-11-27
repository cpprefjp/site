# shared_from_this
* memory[meta header]
* std[meta namespace]
* enable_shared_from_this[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_ptr<T> shared_from_this();
shared_ptr<const T> shared_from_this() const;
```
* shared_ptr[link /reference/memory/shared_ptr.md]

## 概要
`this`ポインタを`shared_ptr`に変換する。


## 要件
`*this`のインスタンスが[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして共有されていること。


## 戻り値
`this`ポインタを、`enable_shared_from_this`の派生クラス型`T`の[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトとして構築して返す。


## 例
```cpp example
#include <cassert>
#include <memory>

struct X : public std::enable_shared_from_this<X> {
  std::shared_ptr<X> f()
  {
    // thisを指すshared_ptrオブジェクトを作る
    return shared_from_this();
  }
};

int main()
{
  std::shared_ptr<X> p(new X());
  std::shared_ptr<X> q = p->f();

  assert(p == q);
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
